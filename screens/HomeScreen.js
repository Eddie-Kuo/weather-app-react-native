import { StatusBar } from 'expo-status-bar';
import { debounce } from 'lodash';
import React, { useCallback, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { CalendarDaysIcon, MapPinIcon } from 'react-native-heroicons/solid';
import { fetchLocations, fetchWeatherForecast } from '../api/weather';
import { theme } from '../theme';

export default function HomeScreen() {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState({});

  function handleLocation(location) {
    setLocations([]);
    toggleSearch(false);
    fetchWeatherForecast({
      cityName: location.name,
      days: '7',
    }).then((data) => {
      setWeather(data);
      console.log(data);
    });
  }

  function handleSearch(value) {
    if (value.length > 2)
      fetchLocations({ cityName: value }).then((data) => {
        setLocations(data);
      });
  }
  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  const { current, location } = weather;

  return (
    <View className='flex-1 relative'>
      {/* Makes the time, battery, signal light */}
      <StatusBar style='light' />
      <Image
        blurRadius={70}
        source={require('../assets/images/bg.png')}
        className='absolute h-full w-full'
      />
      <SafeAreaView className='flex flex-1'>
        {/* Search Section */}
        <View className='mx-4 relative z-50' style={{ height: '7%' }}>
          <View
            className='flex-row justify-end items-center rounded-full'
            // toggle to only show the search bar when we want to search for something
            style={{
              backgroundColor: showSearch ? theme.bgWhite(0.2) : 'transparent',
            }}>
            {/* Search Input */}
            {showSearch ? (
              <TextInput
                onChangeText={handleTextDebounce}
                placeholder='Search City'
                placeholderTextColor={'lightgrey'}
                className='pl-5 h-10 flex-1 text-base text-white'
              />
            ) : null}
            {/* Search Button */}
            <TouchableOpacity
              onPress={() => toggleSearch(!showSearch)}
              className='rounded-full p-2 m-1 bg-white/30'>
              <MagnifyingGlassIcon size='25' color='white' />
            </TouchableOpacity>
          </View>

          {/* Display search results/ locations */}
          {locations.length > 0 && showSearch ? (
            <View className='absolute w-full bg-gray-300 top-16 rounded-3xl'>
              {locations.map((location, index) => {
                // Only show bottom border on items except for the last item - no overflow
                let showBorder = index + 1 !== locations.length;
                let borderClass = showBorder
                  ? 'border-b-2 border-b-gray-400'
                  : '';

                return (
                  <TouchableOpacity
                    onPress={() => handleLocation(location)}
                    key={index}
                    className={
                      'flex-row items-center border-0 p-3 px-4 mb-1 ' +
                      borderClass
                    }>
                    <MapPinIcon size='20' color='gray' />
                    <Text className='text-black text-lg ml-2'>
                      {location?.name},{' '}
                      {location?.region ? location?.region : location?.country}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : null}
        </View>

        {/* Forecast Section */}
        <View className='mx-4 flex justify-around flex-1 mb-2'>
          {/* Location */}
          <Text className='text-white text-center text-2xl font-bold'>
            {location?.name},
            <Text className='text-lg font-semibold text-gray-300'>
              {location?.region ? location?.region : location?.country}
            </Text>
          </Text>

          {/* Weather Image */}
          <View className='flex-row justify-center'>
            <Image
              source={require('../assets/images/partlycloudy.png')}
              className='w-52 h-52'
            />
          </View>

          {/* Degree Indicator */}
          <View className='space-y-2'>
            <Text className='text-center font-bold text-white text-6xl ml-5'>
              {current?.temp_f}&#176;
            </Text>
            <Text className='text-center text-gray-300 text-xl tracking-widest'>
              {current?.condition.text}
            </Text>
          </View>

          {/* Other Stats */}
          <View className='flex-row justify-between mx-4'>
            <View className='flex-row space-x-2 items-center'>
              <Image
                source={require('../assets/icons/wind.png')}
                className='h-6 w-6'
              />
              <Text className='text-white font-semibold text-base'>
                {current?.wind_mph}mph
              </Text>
            </View>
            <View className='flex-row space-x-2 items-center'>
              <Image
                source={require('../assets/icons/drop.png')}
                className='h-6 w-6'
              />
              <Text className='text-white font-semibold text-base'>
                {current?.humidity}%
              </Text>
            </View>
            <View className='flex-row space-x-2 items-center'>
              <Image
                source={require('../assets/icons/sun.png')}
                className='h-6 w-6'
              />
              <Text className='text-white font-semibold text-base'>
                {weather?.forecast?.forecastday[0]?.astro?.sunrise}
              </Text>
            </View>
          </View>

          {/* Forecast for the next days */}
          <View className='mb-2 space-y-3'>
            <View className='flex-row items-center mx-5 space-x-2'>
              <CalendarDaysIcon size='22' color='white' />
              <Text className='text-white text-base'> Daily Forecasts</Text>
            </View>
            <ScrollView
              horizontal
              contentContainerStyle={{ paddingHorizontal: 15 }}
              showsHorizontalScrollIndicator={false}></ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

{
  /* <View
  className='flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4'
  style={{ backgroundColor: theme.bgWhite(0.15) }}>
  <Image
    source={require('../assets/images/heavyrain.png')}
    className='h-11 w-11'
  />
  <Text className='text-white'>Monday</Text>
  <Text className='text-white text-xl font-semibold'>76&#176;</Text>
</View>; */
}
