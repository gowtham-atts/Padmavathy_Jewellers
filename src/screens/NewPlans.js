import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    Animated,
    Dimensions,
    SafeAreaView,
    TurboModuleRegistry,
} from 'react-native';
import { hp } from '../utils/responsive';
import { COLORS, colors, images } from '../utils/constants';
import { getData } from '../utils/storage';
import classificationService from '../services/classificationService';
import ImageZoom from 'react-native-image-pan-zoom';
import { useDispatch } from 'react-redux';
import { setNewPlan } from '../features/newplan/newPlanSlice';
import newPlanStyles from './styles/newPlanStyles';
import DetailsHeader from '../components/DetailsHeader';
import FooterLogo from '../components/FooterLogo';
import Toast from 'react-native-simple-toast';
import { handleConfirmLogout } from '../utils/helpers';
import { setLoading } from '../features/auth/authSlice';
import LoadingSpinner from '../components/LoadingSpinner';





const NewPlans = ({ navigation }) => {

    const [getClassification, setClassification] = useState([]);

    const [expandedIndices, setExpandedIndices] = useState([]);

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false)

  
    const showToast = (message) => {
        Toast.show(message, Toast.SHORT);
    };


    const getClassificationDetails = async () => {
        try {
            setLoading(true)
            let custome_id = await getData('customerId');
            if (!custome_id) {
                custome_id = 0;
            }
            const payload = {
                id_customer: custome_id
            };
            const response = await classificationService.getAllClassification(payload);
                        
            if(response.length === 1){
              setExpandedIndices([0])
            }

            if(response.status === 'invalid'){
                showToast(response?.message);
                handleConfirmLogout();
            } else {
                setClassification(response);
            }
            setLoading(false)
        } catch (err) {
            setLoading(false)
            console.error('Error fetching classification', err);
            showToast('Failed to fetch classification data');
        } finally {
            setLoading(false)
        }
    };

    

    const handleJoinPlan = async (item) => {
        try {
            const custome_id = await getData('customerId');
            if (!custome_id) {
                navigation.replace('Login');
                Toast.show("Please log in to join new plan.",Toast.BOTTOM);
                return;
            } else {
                dispatch(setNewPlan(item));
                navigation.navigate('AmountScheme');
            }
        } catch (error) {
            showToast('Failed to handle join plan');
        }
    };

    const toggleAccordion = (index) => {
        let newExpandedIndices = [...expandedIndices];
        const indexInExpanded = newExpandedIndices.indexOf(index);
        if (indexInExpanded === -1) {
            newExpandedIndices.push(index);
        } else {
            newExpandedIndices.splice(indexInExpanded, 1);
        }
        setExpandedIndices(newExpandedIndices);
    };

    useEffect(() => {
        getClassificationDetails();
    }, []);


    const renderClassificationData = ({ item, index }) => {
        const isExpanded = expandedIndices.includes(index);
        const rotateValue = new Animated.Value(isExpanded ? 1 : 0);
        const rotation = rotateValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '90deg'],
            extrapolate: 'clamp', 
        });

        const toggle = () => {
            Animated.timing(rotateValue, {
                toValue: isExpanded ? 0 : 1,
                duration: 300,
                useNativeDriver: true,
            }).start(() => {
                toggleAccordion(index);
            });
        };
    

        return (
            <View style={[newPlanStyles.accordianContainer, { borderColor: COLORS.BACKGROUND }]}>
                <TouchableOpacity
                    style={[newPlanStyles.accordionItem, { backgroundColor: COLORS.BACKGROUND }]}
                    onPress={toggle}
                >
                    <Text style={[newPlanStyles.accordionTitle, { color: isExpanded ? '#314347' : "#314347" }]}>{item.classification_name}</Text>
                    <TouchableOpacity onPress={toggle} style={newPlanStyles.borderButtonStyle}>
                        <Animated.Image
                            source={images.side_right_icon}
                            style={[newPlanStyles.arrowIcon, { tintColor: isExpanded ? COLORS.WHITE : COLORS.WHITE }, { transform: [{ rotate: rotation }] }]}
                        />
                    </TouchableOpacity>
                </TouchableOpacity>
                {isExpanded && (
                    <View style={newPlanStyles.accordionContent}>
                        <View>
                            <Text style={newPlanStyles.profileHeaderTxt}>{item.description}</Text>
                        </View>
                        <View>
                            <ImageZoom
                                 cropWidth={Dimensions.get('window').width * 0.80}
                                 cropHeight={Dimensions.get('window').height * 0.40}
                                 imageWidth={300}
                                 imageHeight={300}
                                 useNativeDriver={true}
                                 style={{ borderRadius: 10, marginTop: hp(1), alignSelf: 'center' }}
                                 resizeMode="cover"
                             >
                                <Animated.View style={newPlanStyles.imageContainer}>
                                    {item.logo ? (
                                        <Image 
                                            source={{ uri: item.urlpath + item.logo }}
                                            style={newPlanStyles.imgStyle}
                                        />
                                       ) : (
                                        <Image
                                            source={images.default_branch}
                                            style={newPlanStyles.imgStyle}
                                        />
                                    )}
                                </Animated.View>
                            </ImageZoom>
                        </View>
                        <TouchableOpacity
                            onPress={() => handleJoinPlan(item)}
                            style={[
                                newPlanStyles.submitButton,
                                { backgroundColor: colors.gradientBg, marginTop: hp(2) },
                            ]}
                            accessibilityLabel={`Join ${item.classification_name} Plan: ${item.description}`}
                        >
                            <Text style={newPlanStyles.submitText}>Join Schemes</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

        );
    };

    return (
        <SafeAreaView style={newPlanStyles.container}>

            <FlatList
                data={getClassification}
                keyExtractor={(item) =>
                    `${item.id}-${item.classification_name}`
                }
                style={{marginBottom:hp('5%')}}
                renderItem={renderClassificationData}
                ListHeaderComponent={
                    <View>
                        <DetailsHeader
                            title="New Plans"
                            onBackPress={() => navigation.goBack()}
                            onNotifyPress={() => navigation.navigate('Notification')}
                            onWishlistPress={() => navigation.navigate('WishList')}
                        />
                    </View>
                }
              />

            {loading && <LoadingSpinner />}

            <FooterLogo />
    
        </SafeAreaView>
    );
};

export default NewPlans;
