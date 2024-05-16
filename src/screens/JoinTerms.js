import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Image,
    ActivityIndicator,
    FlatList,
    SafeAreaView
} from 'react-native';
import DetailsHeader from '../components/DetailsHeader';
import {
    hp,
    responsiveImageSize,
    rfpercentage,
    wp,
} from '../utils/responsive';
import { COLORS, FONTS, colors } from '../utils/constants';
import ScrollContainer from '../components/ScrollContainer';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import termsService from '../services/termsService';
import { List } from 'react-native-paper';
import Footer from '../components/Footer';
import SkeletonLoader from '../components/SkeletonLoader';
import { useSelector } from 'react-redux';
import { selectNewPlan } from '../features/newplan/newPlanSlice';
import Toast from 'react-native-simple-toast'



const avator = responsiveImageSize(400, 350);


const ListItem = ({ index, item, description }) => (
    <View>
        <List.Item
            title={`${index + 1}. ${description}`}
            titleNumberOfLines={10}
            style={styles.listItem}
            titleStyle={styles.copytxt}
        />
    </View>
);


const JoinTerms = ({ navigation }) => {

    const [termsCondition, setTermsCondition] = useState('');
    const [image, setImage] = useState('');
    const [imageLoading, setImageLoading] = useState(true);
    const classData = useSelector(selectNewPlan);


    const getTermsCondition = async () => {
        const payload = { type: 2 }
        try {
            const response = await termsService.getAllTermsCondition(payload);
            const img = response.urlpath + response.image;
            setImage(img)
            setTermsCondition(response.list)
        } catch {
            Toast.show('Error Getting Terms and Condition', Toast.BOTTOM)
        }
    }


    useEffect(() => {
        getTermsCondition()
    }, [])


    const renderImage = () => {
        if (image) {
            return (
                <Image
                    source={{ uri: image }}
                    style={styles.imageStyle}
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


    const handleOnBackPress = () => {
        if (classData) {
            navigation.replace('AmountScheme');
        } else {
            navigation.goBack()
        }
    }



    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingWrapper>
                <ScrollContainer>
                    <DetailsHeader
                        title="Terms and Conditions"
                        onBackPress={handleOnBackPress}
                        onNotifyPress={() => {
                            navigation.navigate('Notification');
                        }}
                        onWishlistPress={() => {
                            navigation.navigate('WishList');
                        }}
                    />

                    <View style={styles.cardContainer}>
                        {renderImage()}
                    </View>

                    {imageLoading ? <SkeletonLoader />
                        :
                        <View style={styles.desContainer}>
                            <FlatList
                                data={termsCondition}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => <ListItem {...item} index={index} />}
                            />
                        </View>
                    }


                    <View style={{ position: 'absolute', bottom: 0, alignSelf: 'center', marginBottom: hp(2) }}>
                        <Footer />
                    </View>

                </ScrollContainer>
            </KeyboardAvoidingWrapper>
        </SafeAreaView>
    );
};


const commonFontFamily = {
    fontFamily: FONTS.OUTFIT_MEDIUM,
    fontWeight: '500'
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageStyle: {
        ...avator,
        resizeMode: 'contain',
    },
    titleStyle: {
        ...commonFontFamily,
        width: wp(38),
        fontSize: rfpercentage(2),
        color: COLORS.DARK_PRIMARY,
        paddingLeft: 20,
        paddingRight: 20,
    },
    cardContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    copytxt: {
        fontSize: rfpercentage(2),
        color: colors.gray58,
        textAlign: 'justify',
        ...commonFontFamily
    },
    desContainer: {
        padding: 16,
        marginBottom: hp(10)
    },
    listItem: {
        borderBottomWidth: 1,
        borderBottomColor: colors.gray58
    }
});

export default JoinTerms;
