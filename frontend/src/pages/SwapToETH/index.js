import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {CheckBox, Input} from 'react-native-elements';
import {ActivityIndicator} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {swaptoeth} from '../../actions/swapAction';
import Header from '../../components/Header';
import {CustomModal} from '../../components/CustomModal';
import {message} from '../../constant/message';

import styles from './styles';
const SwapToEth = ({navigation, props}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [countHDT, setCountHDT] = useState(0);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(true);
  const [modalData, setModalData] = useState('');
  const [visible, setVisible] = useState(false);
  const store = useSelector(state => state.auth);
  const profile = useSelector(state => state.profile);
  const errors = useSelector(state => state.errors);

  const swap = async () => {
    await setLoading(true);
    await axios
      .get('https://api.binance.com/api/v3/ticker/24hr?symbol=ETHUSDT')
      .then(res => {
        const price = res.data.weightedAvgPrice;
        if (price > 0) {
          if (isNaN(countHDT)) {
            setError({countHDT: 'only input number'});
          } else {
            if (checked) {
              dispatch(
                swaptoeth(
                  store.user.id,
                  Number(profile.profiledata.countHDT),
                  price,
                  store.user.address,
                  onShowModal,
                  setLoading,
                ),
              );
            } else {
              dispatch(
                swaptoeth(
                  store.user.id,
                  Number(countHDT),
                  price,
                  store.user.address,
                  onShowModal,
                  setLoading,
                ),
              );
            }
          }
        }
      });
  };
  const onShowModal = async flag => {
    const data = {
      message: message[1].message,
      flag: flag,
    };
    await setLoading(false);
    await setError({});
    await setCountHDT(0);
    await setModalData(data);
    await setVisible(!visible);
  };
  useEffect(() => {
    setError(errors);
  }, [errors, props, isFocused]);

  return (
    <>
      <Header text="SWAP TO ETH" navigation={navigation} />
      <ScrollView>
        <CustomModal
          item={modalData}
          visible={visible}
          setVisible={setVisible}
        />
        <View style={styles.container}>
          <View>
            <Text style={styles.headText}>SWAP TO ETH</Text>
          </View>
          <View style={styles.userDiv}>
            <Text style={styles.labelText}>Current HDT Balance</Text>
            <Input
              value={
                Number(profile.profiledata.countHDT).toFixed(2).toString() +
                ' HDT'
              }
              disabled
            />
            <Text style={styles.labelText}>Current ETH Balance</Text>
            <Input
              value={
                Number(profile.profiledata.countETH).toFixed(2).toString() +
                ' ETH'
              }
              disabled
            />
            <Text style={styles.labelText}>HDT</Text>
            <Input
              value={
                checked
                  ? Number(profile.profiledata.countHDT).toFixed(2).toString()
                  : countHDT.toString()
              }
              placeholder="Please input HDT Balance"
              onChangeText={message => {
                setCountHDT(message);
              }}
              errorStyle={{color: 'red'}}
              keyboardType="numeric"
              errorMessage={error.countHDT}
              disabled={checked ? true : false}
            />
          </View>

          <CheckBox
            center
            title="Max"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={checked}
            onPress={() => setChecked(!checked)}
          />
          <TouchableOpacity
            style={styles.submitButtonStyle}
            activeOpacity={0.5}
            onPress={() => {
              swap();
            }}>
            <Text style={styles.TextStyle}>SWAP</Text>
            {loading ? (
              <ActivityIndicator animating={true} size={13} color={'white'} />
            ) : (
              <></>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};
export default SwapToEth;
