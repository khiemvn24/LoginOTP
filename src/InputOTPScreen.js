import React, {useState, useEffect, useRef, Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native';
import {AuthenticationScreen} from './AuthenticationScreen';

export function InputOTPScreen({route, navigation}) {
  const textInput1 = useRef(null);
  let clockCall = null;
  const lengthInput = 6;
  const defaultCountdown = 10;
  const [internalVal, setInternalVal] = useState("");
  const [countdown, setCountdown] = useState(defaultCountdown);
  const [enableResend, setEnableResend] = useState(false);
  const [showSMS, setShowSMS] = useState(false);
  const [showtimeOTP, setShowtimeOTP] = useState(false);
  const {numberPhone, codeCountry} = route.params;
 
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
        navigation.navigate('Home');
      } else {
        alert('Mã xác nhận không chính xác');
      }
    }
  };

  const onPress = () => {
    textInput1.current.focus();
    // console.log(textInput1.current.focus, 'aaaaaaa');
  };

  useEffect(() => {
    clockCall = setInterval(() => {
      decrementClock();
    }, 1000);
    return () => {
      clearInterval(clockCall);
    };
  },[]);

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
  
  return (
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
            Hãy nhập mã kích hoạt nhận được từ số điện thoại {codeCountry}{numberPhone}
          </Text>
        </View>
        {/* <View><Text style={style.title1}>Nhập mã OTP của bạn tại đây</Text></View> */}

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

        
        {/* {countdown > 0 ? (
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
        ):(
          <View>
            <View style={style.btnResend}>
              <Text style={style.textResend}>Gửi lại mã xác nhận</Text>
            </View>
            <View style={style.containerInput}>
              <TouchableOpacity onPress={onResendOTP}>
                <Text style={style.textTitle}>Qua Mocha</Text>
              </TouchableOpacity>
              <Text style={style.textResend}>|</Text>
              <TouchableOpacity onPress={onResendOTP}>
                <Text style={style.textTitle}>Qua SMS</Text>
              </TouchableOpacity>
            </View>
          </View>
        )} */}
       
        {showtimeOTP == true && <View>
           
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
          </View>}
        {showSMS == true && (
          <View>
            <View style={style.btnResend}>
              <Text style={style.textResend}>Gửi lại mã xác nhận</Text>
            </View>
            <View style={style.containerInput}>
              <TouchableOpacity onPress={onResendOTP}>
                <Text style={style.textTitle}>Qua Mocha</Text>
              </TouchableOpacity>
              <Text style={style.textResend}>|</Text>
              <TouchableOpacity onPress={onResendOTP}>
                <Text style={style.textTitle}>Qua SMS</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        

        <View style={{flex: 0.55}} />
      </KeyboardAvoidingView>
    </View>
  );
}

const style = StyleSheet.create({
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
  textTitle: {
    marginHorizontal: 10,
    color: 'skyblue',
    fontSize: 15,
  },
});
