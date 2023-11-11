import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
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
import { theme } from '../theme';

export default function HomeScreen() {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([1, 2, 3]);

  function handleLocation(location) {
    console.log(`Location of choice: ${location}`);
  }

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
                      Austin, Texas
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
            Austin,
            <Text className='text-lg font-semibold text-gray-300'>Texas</Text>
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
              76&#176;
            </Text>
            <Text className='text-center text-gray-300 text-xl tracking-widest'>
              Partly Cloudy
            </Text>
          </View>

          {/* Other Stats */}
          <View className='flex-row justify-between mx-4'>
            <View className='flex-row space-x-2 items-center'>
              <Image
                source={require('../assets/icons/wind.png')}
                className='h-6 w-6'
              />
              <Text className='text-white font-semibold text-base'>12mph</Text>
            </View>
            <View className='flex-row space-x-2 items-center'>
              <Image
                source={require('../assets/icons/drop.png')}
                className='h-6 w-6'
              />
              <Text className='text-white font-semibold text-base'>20%</Text>
            </View>
            <View className='flex-row space-x-2 items-center'>
              <Image
                source={require('../assets/icons/sun.png')}
                className='h-6 w-6'
              />
              <Text className='text-white font-semibold text-base'>
                5:45 AM
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
              showsHorizontalScrollIndicator={false}>
              <View
                className='flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4'
                style={{ backgroundColor: theme.bgWhite(0.15) }}>
                <Image
                  source={require('../assets/images/heavyrain.png')}
                  className='h-11 w-11'
                />
                <Text className='text-white'>Monday</Text>
                <Text className='text-white text-xl font-semibold'>
                  76&#176;
                </Text>
              </View>
              <View
                className='flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4'
                style={{ backgroundColor: theme.bgWhite(0.15) }}>
                <Image
                  source={require('../assets/images/heavyrain.png')}
                  className='h-11 w-11'
                />
                <Text className='text-white'>Tuesday</Text>
                <Text className='text-white text-xl font-semibold'>
                  76&#176;
                </Text>
              </View>
              <View
                className='flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4'
                style={{ backgroundColor: theme.bgWhite(0.15) }}>
                <Image
                  source={require('../assets/images/heavyrain.png')}
                  className='h-11 w-11'
                />
                <Text className='text-white'>Wednesday</Text>
                <Text className='text-white text-xl font-semibold'>
                  76&#176;
                </Text>
              </View>
              <View
                className='flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4'
                style={{ backgroundColor: theme.bgWhite(0.15) }}>
                <Image
                  source={require('../assets/images/heavyrain.png')}
                  className='h-11 w-11'
                />
                <Text className='text-white'>Thursday</Text>
                <Text className='text-white text-xl font-semibold'>
                  76&#176;
                </Text>
              </View>
              <View
                className='flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4'
                style={{ backgroundColor: theme.bgWhite(0.15) }}>
                <Image
                  source={require('../assets/images/heavyrain.png')}
                  className='h-11 w-11'
                />
                <Text className='text-white'>Friday</Text>
                <Text className='text-white text-xl font-semibold'>
                  76&#176;
                </Text>
              </View>
              <View
                className='flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4'
                style={{ backgroundColor: theme.bgWhite(0.15) }}>
                <Image
                  source={require('../assets/images/heavyrain.png')}
                  className='h-11 w-11'
                />
                <Text className='text-white'>Saturday</Text>
                <Text className='text-white text-xl font-semibold'>
                  76&#176;
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
