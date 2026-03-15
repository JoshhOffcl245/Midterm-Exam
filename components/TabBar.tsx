import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { sharedStyles } from '../constants/styles';
import { TabName } from '../constants/types';

interface TabBarProps {
  activeTab: TabName;
  onTabPress: (tab: TabName) => void;
}

const TABS: { name: TabName; label: string; icon: string }[] = [
  { name: 'home', label: 'Home', icon: '⌂' },
  { name: 'borrow', label: 'Borrow', icon: '◎' },
  { name: 'return', label: 'Return', icon: '↩' },
  { name: 'inventory', label: 'Inventory', icon: '▤' },
];

export default function TabBar({ activeTab, onTabPress }: TabBarProps) {
  return (
    <View style={sharedStyles.tabBar}>
      {TABS.map((tab) => {
        const isActive = activeTab === tab.name;
        return (
          <TouchableOpacity
            key={tab.name}
            style={sharedStyles.tab}
            onPress={() => onTabPress(tab.name)}
            activeOpacity={0.7}
          >
            <Text style={isActive ? sharedStyles.tabIconActive : sharedStyles.tabIconInactive}>
              {tab.icon}
            </Text>
            <Text style={isActive ? sharedStyles.tabLabelActive : sharedStyles.tabLabelInactive}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}