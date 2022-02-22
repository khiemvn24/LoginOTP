import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Modal,
  FlatList,
  TouchableWithoutFeedbackBase,
  TouchableWithoutFeedback,
  StatusBar,
  Pressable,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import {Login} from './store/actions'
import {Countries} from './Countries';


export function AuthenticationScreen({navigation}) {
  let textInput = useRef(null);
  const defaultCodeCountry = '+84';
  const defauMaskCountry = '968 626 207';
  const [phoneNumber, setPhoneNumber] = useState();
  const [focusInput, setFocusInput] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleOTP, setModalVisibleOTP] = useState(false);
  const [dataCountries, setDataCountries] = useState(Countries);
  const [codeCountry, setCodeCountry] = useState(defaultCodeCountry);
  const [placeholder, setPlaceholder] = useState(defauMaskCountry);
  

  // const {signIn} = React.useContext(AuthContext);
  

  const onShowHideModal = () => {
    setModalVisible(!modalVisible);
  };
  const onChangPhone = number => {
    setPhoneNumber(number);
    // setTemp(number);
  };

  const onChangFocus = () => {
    setFocusInput(true);
  };
  const onChangeBlur = () => {
    setFocusInput(false);
  };
  // useEffect(() => {
  //   textInput.focus();
  // }, []);

  const filterCountries = value => {
    if (value) {
      const countryData = dataCountries.filter(
        obj => obj.en.indexOf(value) > -1 || obj.dialCode.indexOf(value) > -1,
      );
      setDataCountries(countryData);
    } else {
      setDataCountries(Countries);
    }
  };
  const onCountryChange = item => {
    setCodeCountry(item.dialCode);
    setPlaceholder(item.mask);
    onShowHideModal();
  };

  let renderModal = () => {
    return (
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <SafeAreaView style={{flex: 1}}>
          <View style={style.modalContainer}>
            <View style={style.filterInputContainer}>
              <TextInput
                autoFocus={true}
                onChangeText={filterCountries}
                placeholder={'Filter'}
                focusable={true}
                style={style.filterInputStyle}
              />
            </View>

            <FlatList
              style={{flex: 1}}
              data={dataCountries}
              extraData={dataCountries}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <TouchableWithoutFeedback onPress={() => onCountryChange(item)}>
                  <View style={style.countryModalStyle}>
                    <View style={style.modalItemContainer}>
                      <Text style={style.modalItemName}>{item.en}</Text>
                      <Text style={style.modalItemDialCode}>
                        {item.dialCode}
                      </Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              )}
            />
          </View>

          <TouchableOpacity
            onPress={onShowHideModal}
            style={style.closeButtoonStyle}>
            <Text style={style.closeTextStyle}>{'CLOSE'}</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    );
  };

  //OTP
  const textInput1 = useRef(null);
  let clockCall = null;
  const lengthInput = 6;
  const defaultCountdown = 60;
  const [internalVal, setInternalVal] = useState('');
  const [countdown, setCountdown] = useState(defaultCountdown);
  const [enableResend, setEnableResend] = useState(false);
  const [showSMS, setShowSMS] = useState(false);
  const [showtimeOTP, setShowtimeOTP] = useState(false);
  const [temp, setTemp] = useState('');
  
  // const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    if (countdown < 1) {
      setShowSMS(true);
      setShowtimeOTP(false);
    } else {
      setShowSMS(false);
      setShowtimeOTP(true);
    }
  });

  const onChangeText = val => {
    setInternalVal(val);
    if (val.length === lengthInput) {
      if (val == 'A12345' && countdown >= 1) {
        // setIsLogin(true)
        dispatch(Login(internalVal))
      } else {
        alert('Mã xác nhận không chính xác');
      }
    }
  };
  const onPress = () => {
    textInput1.current.focus();
    // console.log(textInput1.current.focus, 'aaaaaaa');
  };

  useEffect (() => {
    clockCall = setInterval(() => {
      decrementClock();
    }, 1000);
    return () => {
      clearInterval(clockCall);
    };
  }, [countdown]);


  const decrementClock = () => {
    if (countdown < 1) {
      setEnableResend(true);
      clearInterval(clockCall);
    } else {
      setCountdown(countdown => countdown - 1);
    }
  };
  const onResendOTP = () => {
    if (countdown < 1) {
      setCountdown(defaultCountdown);
      setEnableResend(false);
      clearInterval(clockCall);
      clockCall = setInterval(() => {
        decrementClock();
      }, 1000);
    }
  };
//  console.log(temp);
  const onPressContinue = () => {
    setTemp(phoneNumber);
    if (phoneNumber != temp) {
      // navigation.navigate('InputOTP', {
      //   numberPhone: phoneNumber,
      //   codeCountry: codeCountry,
      // });
      setModalVisibleOTP(true);
      // onResendOTP();
      setCountdown(defaultCountdown);
      setEnableResend(false);
      clearInterval(clockCall);
      
    }else{
      setModalVisibleOTP(true);
    }
    
  };
  const dispatch = useDispatch();
  const renderInputPhoneNumber = () => {
    return (   

      <View>
        
        <KeyboardAvoidingView
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <View
            style={{
              marginHorizontal: 30,
              marginVertical: 50,
            }}>
            <Text
              style={{
                fontSize: 15,
                marginTop: 30,
                textAlign: 'center',
              }}>
              Vui lòng nhập số điện thoại của bạn. Chúng tôi sẽ gửi một mã xác
              thực đến số của bạn.
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              alignItems: 'center',
              borderWidth: 1,
              backgroundColor: '#BFC7C7',
              borderRadius: 10,
              width: 300,
            }}>
            <TouchableOpacity onPress={onShowHideModal}>
              <View>
                <Text style={{paddingHorizontal: 20}}>
                  {codeCountry + ' |'}{' '}
                </Text>
              </View>
            </TouchableOpacity>
            {renderModal()}
            <View
              style={{
                flexDirection: 'column',
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              <TextInput
                ref={textInput}
                placeholder={placeholder}
                keyboardType="numeric"
                secureTextEntry={false}
                value={phoneNumber}
                onChangeText={onChangPhone}
                onFocus={onChangFocus}
                onBlur={onChangeBlur}
                autoFocus={focusInput}
                style={{width: 230}}
                
              />
            </View>
          </View>

          <View style={{marginTop: 20}}>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                borderRadius: 10,
                width: 300,
                backgroundColor: '#EE0033',
              }}
              onPress={onPressContinue}
              >
              <Text
                style={{
                  padding: 8,
                  fontSize: 15,
                  color: 'white',
                }}>
                Nhận mã xác nhận
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={{
                fontSize: 12,
                marginHorizontal: 40,
                textAlign: 'center',
                marginTop: 10,
              }}>
              Bằng cách cung cấp số điện thoại của mình, tôi đồng ý và chấp nhận
              <Text style={style.textTitle}> Điều khoản dịch vụ </Text>
              và <Text style={style.textTitle}>Chính sách quyền riêng tư </Text>
              đang được sử dụng của ứng dụng.
            </Text>
          </View>
          <View style={{flex: 0.4}}></View>
        </KeyboardAvoidingView>
      </View>
      //  </Pressable>
    );
  };

  const renderInputOTP = () => {
    
    return (
      <Modal
        animationType="slide"
        // transparent={true}
        style={{backgroundColor: '#fff', flex: 1}}
        visible={modalVisibleOTP}
        onRequestClose={() => {
          setModalVisibleOTP(!modalVisibleOTP);
        }}>
        
        <View style={{
          backgroundColor: '#EE0033',
          height: 58,
          width: '100%',
          flexDirection: 'column',
          alignItems: 'center',
          alignSelf: 'center',
          }}>
          <Text style={{
            marginTop: 15,
            color: '#ffff',
            textAlign: 'center',
            fontSize: 18
            }}>Nhận mã xác nhận</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          
          <StatusBar
            animated={true}
            backgroundColor="#EE0033"
            translucent
            backgroundColor={'transparent'}
          />
          <KeyboardAvoidingView style={style.containerAvoiddingView}>
            <View>
              <Text style={style.title}>
                Hãy nhập mã kích hoạt nhận được từ số điện thoại {codeCountry}
                {phoneNumber}
              </Text>
            </View>

            <TextInput
              ref={textInput1}
              style={{width: 0, height: 0}}
              value={internalVal}
              maxLength={lengthInput}
              returnKeyType="done"
              keyboardType="default"
              onChangeText={onChangeText}
            />

            <View style={style.containerInput}>
              {Array(lengthInput)
                .fill()
                .map((data, index) => (
                  <TouchableOpacity
                    key={index}
                    style={style.cellView}
                    onPress={onPress}>
                    <Text style={style.cellText}>
                      {internalVal && internalVal.length > 0
                        ? internalVal[index]
                        : ''}
                    </Text>
                  </TouchableOpacity>
                ))}
            </View>

            {showtimeOTP == true && (
              <View>
                <View>
                  <View style={style.btnResend}>
                    <Text
                      style={{
                        fontSize: 24,
                        color: '#EE0033',
                      }}>
                      {countdown}
                    </Text>
                    <Text style={style.textResend}>Gửi lại mã xác nhận</Text>
                  </View>
                </View>
              </View>
            )}
            {showSMS == true && (
              <View>
                <View style={style.btnResend}>
                  <Text style={style.textResend}>Gửi lại mã xác nhận</Text>
                </View>
                <View style={style.containerInput}>
                  <TouchableOpacity onPress={onResendOTP}>
                    <Text style={style.textTitle1}>Qua Mocha</Text>
                  </TouchableOpacity>
                  <Text style={style.textResend}>|</Text>
                  <TouchableOpacity onPress={onResendOTP}>
                    <Text style={style.textTitle1}>Qua SMS</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            {/* <View>
              <TouchableOpacity style={{backgroundColor: 'red'}}
                onPress={submit}
              >
                <Text>OK</Text>
              </TouchableOpacity>
            </View> */}
            <View style={{flex: 0.55}} />
          </KeyboardAvoidingView>
        </View>
        {/* </Pressable> */}
      </Modal>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center',
      }}
      >
      <StatusBar
        animated={true}
        backgroundColor="#EE0033"
        translucent
        backgroundColor={'transparent'}
      />
      {renderInputPhoneNumber()}
      {renderInputOTP()}
    </View>
  );
}

const style = StyleSheet.create({
  textTitle: {
    color: '#EE0033',
    textDecorationLine: 'underline',
  },
  modalContainer: {
    paddingTop: 15,
    paddingLeft: 25,
    paddingRight: 15,
    flex: 1,
    backgroundColor: 'white',
  },
  filterInputStyle: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
    color: '#424242',
  },
  countryModalStyle: {
    flex: 1,
    borderColor: 'black',
    borderTopWidth: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalItemContainer: {
    flex: 1,
    paddingLeft: 5,
    flexDirection: 'row',
  },
  modalItemName: {
    flex: 1,
    fontSize: 16,
  },
  modalItemDialCode: {
    fontSize: 16,
  },
  filterInputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtoonStyle: {
    padding: 5,
    alignItems: 'center',
  },
  closeTextStyle: {
    padding: 5,
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  containerAvoiddingView: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    width: 275,
    height: 48,
    color: 'black',
    textAlign: 'center',
  },
  title1: {
    fontSize: 15,
    marginTop: 10,
    color: 'black',
    textAlign: 'center',
  },
  textTile: {
    marginTop: 55,

    fontSize: 16,
  },

  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellView: {
    paddingVertical: 10,
    marginVertical: 20,
    width: 50,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EE0033',
  },
  cellText: {
    textAlign: 'center',
    fontSize: 30,
    color: '#EE0033',
  },
  btnResend: {
    alignItems: 'center',
    marginTop: 10,
  },
  textResend: {
    alignItems: 'center',
    fontSize: 15,
    color: '#B5B4B8',
  },
  textTitle1: {
    marginHorizontal: 10,
    color: 'skyblue',
    fontSize: 15,
  },
});
