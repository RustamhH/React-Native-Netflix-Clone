import { Alert, Text, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { storage } from '../../utils/MMKVStore';
import Exit from "../../../assets/icons/exit.svg"
import { useState, useEffect } from 'react';

const Profile = () => {
    const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState('');


    useEffect(() => {
        setUsername(storage.getString('username') || "");
        setAvatar(storage.getString('avatar') || '');
    }, []);

    const handleLogout = () => {
        storage.clearAll();
    };

    return (
        <View className='flex-1 bg-black p-4'>
            <View className='items-center mt-10'>
                <View className='w-[254px] h-[254px] bg-gray-500 rounded-full overflow-hidden'>
                    {avatar ? (
                        <Image
                            source={{ uri: avatar }}
                            className='w-full h-full'
                            resizeMode='cover'
                        />
                    ) : (
                        <Text className='text-white text-center mt-8'>No Avatar</Text>
                    )}
                </View>

                <Text className='text-white font-bold text-xl mt-4'>
                    {username}
                </Text>
            </View>

            <TouchableOpacity
                onPress={handleLogout}
                className='px-5 py-3 self-center w-[140px] mt-10 rounded-lg'
            >
            <Exit/>
            </TouchableOpacity>
        </View>
    );
};

export default Profile;