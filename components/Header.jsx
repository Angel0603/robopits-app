import { View } from 'react-native'
import { Link } from 'expo-router'
import { Pressable } from 'react-native'
import { CartIcon } from '../components/Icons'
import React from 'react'
import SearchBar from './SearchBar'
import { SafeAreaView } from 'react-native-safe-area-context'

const Header = () => {
    return (
        <SafeAreaView className='bg-white'>
        <View className='w-full h-20 border-b border-[#EBF0FF] bg-white'>
            <View className='flex-row my-auto justify-between items-center px-6'>
            <SearchBar />
            <View>
                <Link href="/carrito" asChild>
                    <Pressable>
                        <CartIcon />
                    </Pressable>
                </Link>
            </View>
            </View>
        </View>
        </SafeAreaView>
    )
}

export default Header