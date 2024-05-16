import React, { useState, useEffect } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, Linking, ScrollView, SafeAreaView } from 'react-native';
import { getBgColor, images } from '../utils/constants';
import DetailsHeader from '../components/DetailsHeader';
import Card from '../components/Card';
import { Iconify } from 'react-native-iconify';
import wishListService from '../services/wishListService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { selectProductState, setNewArrivalDetails, toggleWishlist } from '../features/products/productSlice';
import { getData } from '../utils/storage';
import offerService from '../services/offerService';
import { selectedNewArrivals } from '../features/offers/offerSlice';
import ImageZoom from 'react-native-image-pan-zoom';
import SkeletonLoader from '../components/SkeletonLoader';
import newArrivalDetailStyles from './styles/newArrivalsDetailStyles';
import { hp, wp } from '../utils/responsive';
import Toast from 'react-native-simple-toast';





const NewArrivalsDetails = ({ navigation }) => {


    const newArrivalsData = useSelector(selectedNewArrivals);

    const { newArrivalDetails, wishlist } = useSelector(selectProductState);

    const dispatch = useDispatch();

    const [isUserLogin, setIsLoggedIn] = useState('');

    const [loading, setLoading] = useState(false);


    const splitStrings = newArrivalsData.new_arrivals_img_path.split(",");


    const [selectedImg, setSelectedImg] = useState(splitStrings[0]);

    const isAuth = async () => {
        const isLoggedIn = await AsyncStorage.getItem('loggedIn');
        setIsLoggedIn(isLoggedIn)
        return isLoggedIn;
    }


    const getNewArrivalDetails = async () => {
        const custome_id = await getData('customerId');
        try {
            setLoading(true)
            const payload = {
                id_new_arrivals: newArrivalsData.id_new_arrivals,
                id_customer: custome_id,
            };
            const response = await offerService.getByIdNewArrivalList(payload);
            dispatch(setNewArrivalDetails(response));
            setLoading(false)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }


    const updateWishList = async () => {

        const custome_id = await getData('customerId');

        try {
            if (!custome_id) {
                navigation.replace('Login');
                Toast.show("Please login.",Toast.BOTTOM);
                return;
            }
            const payload = {
                id_customer: custome_id,
                id: newArrivalsData.id_new_arrivals,
                type: 'newarrival',
                status: wishlist ? 0 : 1,
            };

            const response = await wishListService.updateWishList(payload);
            if (response?.status === "success") {
                dispatch(toggleWishlist(1));
                saveWishlistStatus();
                Toast.show(response.message, Toast.BOTTOM);
            } else {
                dispatch(toggleWishlist(0));
                removeWishlistStatus();
                Toast.show(response.message, Toast.BOTTOM);
            }
        } catch (err) {
                console.log(err)
        }
    };

    const loadWishlistStatus = async () => {
        try {
            const wishlistStatus = await AsyncStorage.getItem('wishlistStatus');
            if (wishlistStatus !== null) {
                dispatch(toggleWishlist(JSON.parse(wishlistStatus)));
            }
        } catch (error) {
            Toast.show('Error loading wishlist status:', Toast.BOTTOM);
        }
    };

    const saveWishlistStatus = async () => {
        try {
            await AsyncStorage.setItem('wishlistStatus', JSON.stringify(wishlist));
        } catch (error) {
            Toast.show('Error saving wishlist status:', Toast.BOTTOM);
        }
    };

    const removeWishlistStatus = async () => {
        try {
            await AsyncStorage.removeItem('wishlistStatus');
        } catch (error) {
            Toast.show('Error removing wishlist status:', Toast.BOTTOM);
        }
    };


    const onSelectedImg = (img) => {
        setSelectedImg(img);
    }



    useEffect(() => {
        getNewArrivalDetails();
        loadWishlistStatus();
        isAuth();
    }, []);



    return (
        <SafeAreaView style={newArrivalDetailStyles.container}>
            
            <ScrollView contentContainerStyle={{ paddingBottom: hp('5%') }}>

                <DetailsHeader
                    title="New Arrivals Details"
                    onBackPress={() => {
                        navigation.goBack()
                    }}
                    onNotifyPress={() => {
                        navigation.navigate('Notification');
                    }}
                    onWishlistPress={() => {
                        navigation.navigate('WishList');
                    }}
                />

                {loading ? <SkeletonLoader /> :
                    <View style={{ marginTop: hp(3) }}>
                        <Card style={newArrivalDetailStyles.cardCtnr}>
                            <ImageZoom
                                 cropWidth={Dimensions.get('window').width * 0.9}
                                 cropHeight={Dimensions.get('window').height * 0.5}
                                 imageWidth={Dimensions.get('window').width * 0.9}
                                 imageHeight={Dimensions.get('window').height * 0.5}
                                useNativeDriver={true}
                                style={{ borderRadius: 10 }}>
                              {splitStrings?.map((img, index) => (
                                    <Card key={index} >
                                        <Image
                                            key={index}
                                            source={{ uri: newArrivalsData?.urlpath + selectedImg }}
                                            style={newArrivalDetailStyles.mainImg}
                                            defaultSource={{ uri: newArrivalsData?.urlpath + splitStrings[0] }}
                                        />
                                    </Card>
                                 ))}
                            </ImageZoom>
                        </Card>


                  <View style={{marginLeft:hp(2),marginRight:hp(2)}}>


                        <View style={newArrivalDetailStyles.descCard}>
                            {splitStrings?.map((img, index) => (
                                <TouchableOpacity key={index} onPress={()=>onSelectedImg(img,index)}>
                                    <Card key={index}>
                                        <Image
                                            key={index}
                                            source={{ uri: newArrivalsData?.urlpath + img }}
                                            style={newArrivalDetailStyles.subImg}
                                            resizeMode='contain'
                                        />
                                    </Card>
                                </TouchableOpacity>
                            ))}
                        </View>


                        <Card style={newArrivalDetailStyles.contentCard}>
                            <View style={newArrivalDetailStyles.header}>
                                <View style={newArrivalDetailStyles.titleContainer}>
                                    <Text style={newArrivalDetailStyles.titleText}>{newArrivalsData?.name}</Text>
                                    <Text style={newArrivalDetailStyles.subtitleText}>₹ {newArrivalsData?.price}
                                    </Text>
                                </View>
                                <View style={newArrivalDetailStyles.actionContainer}>
                                    <TouchableOpacity
                                        onPress={updateWishList}
                                        style={newArrivalDetailStyles.thirdButton}
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


                        <Card style={newArrivalDetailStyles.contentCard}>
                            <View style={newArrivalDetailStyles.titleContainer}>
                                <Text style={newArrivalDetailStyles.subtitleText}>{"Description"}</Text>
                                <Text style={newArrivalDetailStyles.titleText}>{newArrivalsData?.product_description}</Text>
                            </View>
                        </Card>

                        </View>


                    </View>}

            </ScrollView>
        </SafeAreaView>
    );
};



export default NewArrivalsDetails;
