import React from 'react'
import {Platform} from 'react-native'
import {THEME} from '../theme'
import {Ionicons} from '@expo/vector-icons'
import {HeaderButton} from 'react-navigation-header-buttons'

export const AppHeaderIcon = (props) => (
<HeaderButton 
    {...props}
    iconSize={24} 
    color={Platform.OS ==='android' ? '#fff':  THEME.MAIN_COLOR} 
    IconComponent={Ionicons}
/>
)