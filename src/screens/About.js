import React, { useEffect, useState } from 'react';
import {
    View,
    Image,
    ActivityIndicator,
    FlatList,
    SafeAreaView
} from 'react-native';
import DetailsHeader from '../components/DetailsHeader';
import { hp } from '../utils/responsive';
import { colors } from '../utils/constants';
import termsService from '../services/termsService';
import { List } from 'react-native-paper';
import aboutStyles from './styles/aboutStyles';
import FooterLogo from '../components/FooterLogo';




const ListItem = ({ description }) => (
    <View style={{marginTop:hp(2)}}>
        <List.Item
            title={`${description}`}
            titleNumberOfLines={10}
            style={aboutStyles.listItem}
            titleStyle={aboutStyles.copytxt}
        />
    </View>
);


const About = ({ navigation }) => {

    const [termsCondition, setTermsCondition] = useState('');
    const [image, setImage] = useState('');
    const [imageLoading, setImageLoading] = useState(false);
    const [error, setError] = useState('');


    const getTermsCondition = async () => {
        const payload = { type: 1 }
        try {
            setImageLoading(true)
            const response = await termsService.getAllTermsCondition(payload);
            const img = response.urlpath + response.image;
            setImage(img)
            setTermsCondition(response.list);
            setImageLoading(false)
        } catch {
            setImageLoading(false)
            setError("Error terms condition");
        } finally {
            setImageLoading(false)
        }
    }

    useEffect(() => {
        getTermsCondition()
    }, [])


    const renderImage = () => {
        if (image) {
            return (
                <Image
                    source={{uri:image}}
                    style={aboutStyles.imageStyle}
                    onLoadStart={() => setImageLoading(true)}
                    onLoad={() => setImageLoading(false)}
                    onError={(error) => {
                        setImageLoading(false);
                    }}
                />
            );
        } else {
            return (
                <ActivityIndicator size="large" color={colors.gradientBg} />
            );
        }
    };


    return (
        <SafeAreaView style={aboutStyles.container}>
            <FlatList
                data={termsCondition}
                contentContainerStyle={{paddingBottom:hp('5%')}}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => <ListItem {...item} index={index} />}
                ListHeaderComponent={
                    <View>
                        <DetailsHeader
                            title="About"
                            onBackPress={() => {
                                navigation.goBack();
                            }}
                            onNotifyPress={() => {
                                navigation.navigate('Notification');
                            }}
                            onWishlistPress={() => {
                                navigation.navigate('WishList');
                            }}
                        />
                         <View style={{marginTop:hp(2)}}>
                           {renderImage()}
                        </View>
                    </View>}
                />
                <FooterLogo />
        </SafeAreaView>
    );
};


export default About;
