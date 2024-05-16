import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Linking,
    Dimensions,
    ImageBackground
} from 'react-native';
import {
    responsiveHeight,
    responsiveImageSize,
    scaleFont,
} from '../utils/responsive';
import { COLORS, FONTS, colors, getBgColor } from '../utils/constants';
import ScrollContainer from '../components/ScrollContainer';
import DetailsHeader from '../components/DetailsHeader';
import Card from '../components/Card';
import { Iconify } from 'react-native-iconify';
import productService from '../services/productService';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import {
    selectProductState,
    selectedProducts,
    setProductDetails,
    toggleWishlist,
} from '../features/products/productSlice';
import wishListService from '../services/wishListService';
import { getData } from '../utils/storage';
import ImageZoom from 'react-native-image-pan-zoom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SkeletonLoader from '../components/SkeletonLoader';
import Toast from 'react-native-simple-toast';

const ringImg = responsiveImageSize(350, 300);

const ringDesc = responsiveImageSize(80, 80);


const ProductDetails = ({ navigation }) => {

    // const whatsappNo = getWhatsAppNo();

    // const email = getEmail()

    // const enquiryNo = getTollFree();

    const enquiryNo = '8667361738';

    const whatsappNo = '8667361738';

    const email = 'gowtham@atts.in';

    const dispatch = useDispatch();

    const BG_COLOR = getBgColor();

    const [loading, setLoading] = useState(false);

    const { productDetails, wishlist } = useSelector(selectProductState);

    const productsData = useSelector(selectedProducts);

    const [isUserLogin, setIsLoggedIn] = useState('');

    const isAuth = async () => {
       const isLoggedIn = await AsyncStorage.getItem('loggedIn');
       setIsLoggedIn(isLoggedIn)
       return isLoggedIn;
    }

    const handlePhonePress = () => {
        if(isUserLogin){
            Linking.openURL(`tel:${enquiryNo}`);
        } else {
            navigation.replace('Register')
        }
        
    };

    const handleWhatsAppPress = () => {
        if(isUserLogin){
            Linking.openURL(`whatsapp://send?phone= +${whatsappNo}`);
        } else {
            navigation.replace('Register')
        }        
    };

    const handleMailPress = () => {
        if(isUserLogin){
            Linking.openURL(`mailto:${email}`);
        } else {
            navigation.replace('Register')
        }    
    };

    const getProductDetails = async () => {
        const custome_id = await getData('customerId');
        try {
            setLoading(true)
            const payload = {
                id_product: productsData?.id_product,
                id_customer: custome_id,
            };
            const response = await productService.getByIdProductList(payload);
            const productList = response?.list;
            dispatch(setProductDetails(productList));
            setLoading(false)
        } catch (err) {
            console.error('Error fetching Product by Id List', err);
        } finally {
            setLoading(false)
        }
    };


    const updateWishList = async () => {

        const custome_id = await getData('customerId');
    
        try {
            const payload = {
                id_customer: custome_id,
                id: productsData?.id_product,
                type: 'product',
                status: wishlist ? 0 : 1,
            };
    
            const response = await wishListService.updateWishList(payload);
    
            if (response?.message === "Wishlist removed") {
                const updatedProductDetails = {
                    ...productDetails,
                    wishlist: 0,
                };
                dispatch(setProductDetails(updatedProductDetails));
                dispatch(toggleWishlist(0));
                removeWishlistStatus()
            } else {
                const updatedProductDetails = {
                    ...productDetails,
                    wishlist: 1,
                };
                dispatch(setProductDetails(updatedProductDetails));
                dispatch(toggleWishlist(1));
                saveWishlistStatus();
            }
            Toast.show(
                `${response?.message}`,
                Toast.BOTTOM
            );
        } catch (err) {
            console.error('Error updating wishlist', err);
            Toast.show(
                'Error updating wishlist',
                Toast.BOTTOM
            );
        }
    };
    


    const loadWishlistStatus = async () => {
        try {
            const wishlistStatus = await AsyncStorage.getItem('wishlistStatus');
            if (wishlistStatus !== null) {
                dispatch(toggleWishlist(JSON.parse(wishlistStatus)));
            }
        } catch (error) {
            console.error('Error loading wishlist status:', error);
        }
    };

    const saveWishlistStatus = async () => {
        try {
            await AsyncStorage.setItem('wishlistStatus', JSON.stringify(wishlist));
        } catch (error) {
            console.error('Error saving wishlist status:', error);
        }
    };

    const removeWishlistStatus = async () => {
        try {
            await AsyncStorage.removeItem('wishlistStatus');
        } catch (error) {
            console.error('Error removing wishlist status:', error);
        }
    };


    useEffect(() => {
        getProductDetails();
        loadWishlistStatus();
        isAuth();
    }, []);


    

    return (
        <View style={styles.container}>
            <ScrollContainer>
                <DetailsHeader
                    title="Product Details"
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

                {loading ? <SkeletonLoader/> : <View>
                    <Card style={styles.cardCtnr}>
                        <ImageZoom
                            cropWidth={Dimensions.get('window').width - 50}
                            cropHeight={Dimensions.get('window').height - 400}
                            imageWidth={350}
                            imageHeight={300}
                            useNativeDriver={true}
                            style={{ borderRadius: 10 }}
                        >
                            <Image
                                source={{
                                    uri:
                                        productsData?.urlpath + productsData?.proimage,
                                }}
                                style={styles.mainImg}
                            />
                        </ImageZoom>
                    </Card>

                    <Card style={styles.descCard}>
                        <Image
                            source={{
                                uri:
                                    productsData?.urlpath + productsData?.proimage,
                            }}
                            style={styles.subImg}
                        />
                    </Card>

                    <Card style={styles.contentCard}>
                        <View style={styles.header}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.titleText}>
                                    {productsData?.productname}
                                </Text>
                                <Text style={styles.subtitleText}>
                                    ₹ {productsData?.price}{' '}
                                </Text>
                            </View>
                            <View style={styles.actionContainer}>
                                <TouchableOpacity
                                    onPress={updateWishList}
                                    style={styles.thirdButton}
                                >
                                    {productDetails?.wishlist ? (
                                        <Iconify
                                            icon="iconamoon:heart-fill"
                                            size={24}
                                            color="#E93B3B"
                                        />
                                    ) : (
                                        <Iconify icon="iconamoon:heart" size={24} color="gray" />
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Card>

                    <Card style={styles.contentCard}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.subtitleText}>{"Description"}</Text>
                            <Text style={styles.descText}>
                                {productsData?.description}
                            </Text>
                        </View>
                    </Card>

                    <Card style={styles.socialCard}>
                        <View style={styles.socialCntr}>
                            <TouchableOpacity style={{ alignItems: 'center' }} onPress={handlePhonePress}>
                                <ImageBackground resizeMode='contain'
                                    style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}
                                    source={require('../assets/shanthi_jellewery/enquiry-call.png')}>
                                    <Iconify
                                        icon="material-symbols:call-sharp"
                                        size={15}
                                    />
                                </ImageBackground>
                                <Text style={styles.enquiryTxt}>{"Enquiry call"}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ alignItems: 'center' }} onPress={handleWhatsAppPress}>
                                <ImageBackground resizeMode='contain'
                                    style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}
                                    source={require('../assets/shanthi_jellewery/whatsapp.png')}>
                                    <Iconify
                                        icon="logos:whatsapp-icon"
                                        size={15}
                                    />
                                </ImageBackground>
                                <Text style={styles.enquiryTxt}>{"Whatsapp"}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ alignItems: 'center' }} onPress={handleMailPress}>
                                <ImageBackground resizeMode='contain'
                                    style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}
                                    source={require('../assets/shanthi_jellewery/mail.png')}>
                                    <Iconify
                                        icon="ion:mail-outline"
                                        size={15}
                                    />
                                </ImageBackground>
                                <Text style={styles.enquiryTxt}>{"Mail"}</Text>
                            </TouchableOpacity>

                        </View>
                    </Card>
                 </View>}

            </ScrollContainer>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: '20%',
        marginLeft: responsiveHeight(1),
        marginRight: responsiveHeight(1)
    },
    cardCtnr: {
        flex: 1,
        borderRadius: 8,
        alignSelf: 'center',
    },
    descCard: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderRadius: 8,
        alignSelf: 'flex-start',
        gap: 10,
        padding: 6,
        margin: 10,
    },
    contentCard: {
        // backgroundColor: 'white',
        borderRadius: 8,
        // elevation: 3,
        gap: 10,
        padding: 6,
        margin: 10,
    },
    socialCard: {
        marginLeft: 10,
        marginBottom: responsiveHeight(3),
        marginTop: responsiveHeight(2)
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    titleContainer: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 5,
    },
    titleText: {
        fontSize: scaleFont(18),
        fontWeight: '500',
        color: COLORS.DARK_PRIMARY,
        fontFamily: FONTS.OUTFIT_MEDIUM,
        textTransform:'capitalize'
    },
    descText: {
        fontSize: scaleFont(14),
        fontWeight: '500',
        color: '#B7B7B7',
        fontFamily: FONTS.OUTFIT_MEDIUM,
        textTransform:'capitalize'
    },
    subtitleText: {
        fontSize: scaleFont(16),
        fontFamily: FONTS.OUTFIT_BOLD,
        color: COLORS.DARK_PRIMARY,
        fontWeight: '500',
    },
    priceText: {
        fontSize: scaleFont(10),
        fontWeight: '500',
    },
    actionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    thirdButton: {
        padding: 8,
    },
    socialCntr: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 15,
    },
    mainImg: {
        ...ringImg,
        resizeMode: 'cover'
    },
    subImg: {
        ...ringDesc,
        resizeMode: 'cover',
        borderRadius: 8,
        borderColor:colors.gradientBg,
        borderWidth:1
    },
    enquiryAlign: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
    },
    enquiryTxt: {
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: scaleFont(12),
        color: '#292929',
        fontWeight: '600',
        textAlign:'center',
        marginTop:responsiveHeight(1)
    },
});

export default ProductDetails;
