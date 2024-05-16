import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    SafeAreaView
} from 'react-native';
import ScrollContainer from '../components/ScrollContainer';
import DetailsHeader from '../components/DetailsHeader';
import Card from '../components/Card';
import { Iconify } from 'react-native-iconify';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import {
    selectOfferState,
    setOfferDetails,
    toggleWishlist,
} from '../features/products/productSlice';
import wishListService from '../services/wishListService';
import { getData } from '../utils/storage';
import ImageZoom from 'react-native-image-pan-zoom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import offerService from '../services/offerService';
import { selectedOffers } from '../features/offers/offerSlice';
import SkeletonLoader from '../components/SkeletonLoader';
import offerDetailStyles from './styles/offerDetailStyles';
import Toast from 'react-native-simple-toast';
import { images } from '../utils/constants';
import { hp, wp } from '../utils/responsive';




const OfferDetails = ({ navigation }) => {


    const dispatch = useDispatch();

    const [isUserLogin, setIsLoggedIn] = useState('');

    const [loading, setLoading] = useState(false);

    const { offerDetails, wishlist } = useSelector(selectOfferState);

    const offerData = useSelector(selectedOffers);

    const splitStrings = offerData.offer_img_path.split(",");

    const [selectedImg, setSelectedImg] = useState(splitStrings[0]);


    const getOfferDetails = async () => {
        const custome_id = await getData('customerId');
        try {
            setLoading(true)
            const payload = {
                id_offer: offerData.id_offer,
                id_customer: custome_id,
            };
            const response = await offerService.getByIdOfferList(payload);
            const offerList = response?.list;
            dispatch(setOfferDetails(offerList));
            setLoading(false)
        } catch (err) {
            console.log('Error fetching Id by offer', err);
        } finally {
            setLoading(false)

        }
    };



    const updateWishList = async () => {

        let custome_id = await getData('customerId');

        try {
            if (!custome_id) {
                navigation.replace('Login');
                Toast.show("Please login.",Toast.BOTTOM);
                return;
            }
            const payload = {
                id_customer: custome_id,
                id: offerData.id_offer,
                type: 'offer',
                status: wishlist ? 0 : 1,
            };

            const response = await wishListService.updateWishList(payload);

            if (response?.message === "Wishlist removed") {
                const updatedProductDetails = {
                    ...offerDetails,
                    wishlist: 0,
                };
                dispatch(setOfferDetails(updatedProductDetails));
                dispatch(toggleWishlist(0));
                removeWishlistStatus()
            } else {
                const updatedProductDetails = {
                    ...offerDetails,
                    wishlist: 1,
                };
                dispatch(setOfferDetails(updatedProductDetails));
                dispatch(toggleWishlist(1));
                saveWishlistStatus();
            }
            Toast.show(
                `${response?.message}`,
                Toast.BOTTOM
            );
        } catch (err) {
            console.log('Error updating wishlist', err);
        }
    };

    const loadWishlistStatus = async () => {
        try {
            const wishlistStatus = await AsyncStorage.getItem('wishlistStatus');
            if (wishlistStatus !== null) {
                dispatch(toggleWishlist(JSON.parse(wishlistStatus)));
            }
        } catch (error) {
            console.log('Error loading wishlist status:', error);
        }
    };

    const saveWishlistStatus = async () => {
        try {
            await AsyncStorage.setItem('wishlistStatus', JSON.stringify(wishlist));
        } catch (error) {
            console.log('Error saving wishlist status:', error);
        }
    };

    const removeWishlistStatus = async () => {
        try {
            await AsyncStorage.removeItem('wishlistStatus');
        } catch (error) {
            console.log('Error removing wishlist status:', error);
        }
    };


    const isAuth = async () => {
        const isLoggedIn = await AsyncStorage.getItem('loggedIn');
        setIsLoggedIn(isLoggedIn)
        return isLoggedIn;
    }


    const onSelectedImg = (img) => {
        setSelectedImg(img);
    }

    useEffect(() => {
        getOfferDetails()
        loadWishlistStatus();
        isAuth()
    }, []);


    return (
        <SafeAreaView style={offerDetailStyles.container}>
            <ScrollContainer>
                <DetailsHeader
                    title="Offer Details"
                    onBackPress={() => {
                        navigation.goBack('Offer');
                    }}
                    onNotifyPress={() => {
                        navigation.navigate('Notification');
                    }}
                    onWishlistPress={() => {
                        navigation.navigate('WishList');
                    }}
                />

                {loading ?
                    <SkeletonLoader /> :
                    <View>
                        <Card style={offerDetailStyles.cardCtnr}>
                            <ImageZoom
                                cropWidth={Dimensions.get('window').width * 0.9}
                                cropHeight={Dimensions.get('window').height * 0.5}
                                imageWidth={Dimensions.get('window').width * 0.9}
                                imageHeight={Dimensions.get('window').height * 0.5}
                                useNativeDriver={true}
                                style={{ borderRadius: 10 }}
                             >
                                {splitStrings?.map((img, index) => (
                                    <Card key={index} >
                                        <Image
                                            key={index}
                                            source={{ uri: offerData?.urlpath + selectedImg }}
                                            style={offerDetailStyles.mainImg}
                                            defaultSource={{ uri: offerData?.urlpath + splitStrings[0] }}
                                        />
                                    </Card>
                                ))}
                            </ImageZoom>
                        </Card>
 

                    <View style={{marginLeft:hp(2),marginRight:hp(2)}}>


                      <View style={offerDetailStyles.descCard}>
                            {splitStrings?.map((img, index) => (
                                <TouchableOpacity key={index} onPress={() => onSelectedImg(img, index)}>
                                    <Card key={index}>
                                        <Image
                                            key={index}
                                            source={{ uri: offerData?.urlpath + img }}
                                            style={offerDetailStyles.subImg}
                                            resizeMode='contain'
                                        />
                                    </Card>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Card style={offerDetailStyles.contentCard}>
                            <View style={offerDetailStyles.header}>
                                <View style={offerDetailStyles.titleContainer}>
                                    <Text style={offerDetailStyles.titleText}>
                                        {offerData?.name}
                                    </Text>
                                    {/* <Text style={offerDetailStyles.subtitleText}>
                                        
                                        ₹ {offerData?.price}
                                    </Text> */}
                                </View>

                                <View style={offerDetailStyles.actionContainer}>
                                    <TouchableOpacity
                                        onPress={updateWishList}
                                        style={offerDetailStyles.thirdButton}
                                    >
                                          {wishlist ? (
                                                <Image source={images.fillHeart} style={{width:wp('8%'), height:hp('4%'), resizeMode:'contain'}} />
                                            ) : (
                                                <Image source={images.wishlist} style={{width:wp('8%'), height:hp('4%'), resizeMode:'contain'}} />

                                            )}
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Card>


                        <Card style={offerDetailStyles.contentCard}>
                            <View style={offerDetailStyles.titleContainer}>
                                <Text style={offerDetailStyles.subtitleText}>{"Description"}</Text>
                                <Text style={offerDetailStyles.descText}>
                                    {offerData?.offer_content}
                                </Text>
                            </View>
                        </Card>

                    </View>



                    </View>}



            </ScrollContainer>
        </SafeAreaView>
    );
};



export default OfferDetails;
