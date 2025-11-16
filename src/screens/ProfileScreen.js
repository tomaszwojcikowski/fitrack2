import React from 'react';
import { ScrollView } from 'react-native';
import { styled, YStack, XStack, Text as TamaguiText } from '@tamagui/core';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { getDeviceDisplayInfo, isHighDPIDevice, roundToNearestPixel } from '../utils/imageOptimization';

const AnimatedYStack = Animated.createAnimatedComponent(YStack);
const AnimatedXStack = Animated.createAnimatedComponent(XStack);

const Container = styled(ScrollView, {
  flex: 1,
  backgroundColor: '$gray2',
});

const Header = styled(YStack, {
  alignItems: 'center',
  backgroundColor: '$background',
  padding: '$xl',
  borderBottomWidth: 1,
  borderBottomColor: '$gray3',
});

const AvatarContainer = styled(YStack, {
  position: 'relative',
  marginBottom: '$md',
});

const Avatar = styled(YStack, {
  width: 100,
  height: 100,
  borderRadius: 50,
  backgroundColor: '$primary',
  justifyContent: 'center',
  alignItems: 'center',
});

const EditAvatarButton = styled(XStack, {
  position: 'absolute',
  right: 0,
  bottom: 0,
  width: 32,
  height: 32,
  borderRadius: 16,
  backgroundColor: '$gray12',
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 2,
  borderColor: '$background',
  pressStyle: {
    scale: 0.9,
  },
});

const Name = styled(TamaguiText, {
  fontSize: 24,
  fontWeight: 'bold',
  color: '$gray12',
  marginBottom: '$xs',
});

const Email = styled(TamaguiText, {
  fontSize: 16,
  color: '$gray10',
});

const StatsContainer = styled(XStack, {
  backgroundColor: '$background',
  padding: '$lg',
  justifyContent: 'space-around',
  borderBottomWidth: 1,
  borderBottomColor: '$gray3',
});

const StatItem = styled(YStack, {
  alignItems: 'center',
});

const StatDivider = styled(YStack, {
  width: 1,
  backgroundColor: '$gray3',
});

const StatValue = styled(TamaguiText, {
  fontSize: 24,
  fontWeight: 'bold',
  color: '$primary',
  marginBottom: '$xs',
});

const StatLabel = styled(TamaguiText, {
  fontSize: 12,
  color: '$gray10',
});

const MenuContainer = styled(YStack, {
  padding: '$md',
  gap: '$sm',
});

const MenuItem = styled(XStack, {
  backgroundColor: '$background',
  padding: '$md',
  borderRadius: '$lg',
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 3,
  pressStyle: {
    backgroundColor: '$gray1',
    scale: 0.98,
  },
});

const MenuIconContainer = styled(YStack, {
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: '$gray2',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: '$md',
});

const MenuInfo = styled(YStack, {
  flex: 1,
});

const MenuTitle = styled(TamaguiText, {
  fontSize: 16,
  fontWeight: '600',
  color: '$gray12',
  marginBottom: 4,
});

const MenuSubtitle = styled(TamaguiText, {
  fontSize: 14,
  color: '$gray10',
});

export default function ProfileScreen() {
  const displayInfo = getDeviceDisplayInfo();
  const isHighDPI = isHighDPIDevice();
  
  const menuItems = [
    { icon: 'person', title: 'Edit Profile', subtitle: 'Update your personal information' },
    { icon: 'settings', title: 'Settings', subtitle: 'App preferences and configurations' },
    { icon: 'notifications', title: 'Notifications', subtitle: 'Manage your notifications' },
    { icon: 'trophy', title: 'Achievements', subtitle: 'View your milestones' },
    { icon: 'calendar', title: 'Training Schedule', subtitle: 'Manage your workout plan' },
    { icon: 'smartphone', title: 'Display Info', subtitle: `Pixel Ratio: ${displayInfo.pixelRatio}x ${isHighDPI ? '(High-DPI)' : ''}` },
    { icon: 'help-circle', title: 'Help & Support', subtitle: 'Get help and contact support' },
  ];

  return (
    <Container>
      <AnimatedYStack entering={FadeInDown.springify()}>
        <Header>
          <AvatarContainer>
            <Avatar>
              <Ionicons name="person" size={48} color="#FFF" />
            </Avatar>
            <EditAvatarButton>
              <Ionicons name="camera" size={16} color="#FFF" />
            </EditAvatarButton>
          </AvatarContainer>
          <Name>John Doe</Name>
          <Email>john.doe@example.com</Email>
        </Header>
      </AnimatedYStack>

      <AnimatedXStack entering={FadeInDown.delay(100).springify()}>
        <StatsContainer>
          <StatItem>
            <StatValue>156</StatValue>
            <StatLabel>Total Workouts</StatLabel>
          </StatItem>
          <StatDivider />
          <StatItem>
            <StatValue>24</StatValue>
            <StatLabel>Streak Days</StatLabel>
          </StatItem>
          <StatDivider />
          <StatItem>
            <StatValue>42</StatValue>
            <StatLabel>PRs Set</StatLabel>
          </StatItem>
        </StatsContainer>
      </AnimatedXStack>

      <MenuContainer>
        {menuItems.map((item, index) => (
          <AnimatedYStack key={index} entering={FadeInDown.delay(200 + index * 50).springify()}>
            <MenuItem>
              <MenuIconContainer>
                <Ionicons name={item.icon} size={24} color="#FF6B35" />
              </MenuIconContainer>
              <MenuInfo>
                <MenuTitle>{item.title}</MenuTitle>
                <MenuSubtitle>{item.subtitle}</MenuSubtitle>
              </MenuInfo>
              <Ionicons name="chevron-forward" size={24} color="#666" />
            </MenuItem>
          </AnimatedYStack>
        ))}
      </MenuContainer>

      <AnimatedYStack entering={FadeInDown.delay(500).springify()}>
        <LogoutButton>
          <Ionicons name="log-out" size={20} color="#EF4444" />
          <LogoutText>Log Out</LogoutText>
        </LogoutButton>
      </AnimatedYStack>

      <AnimatedYStack entering={FadeInDown.delay(600).springify()}>
        <Version>Version 1.0.0</Version>
      </AnimatedYStack>
    </Container>
  );
}

const LogoutButton = styled(XStack, {
  backgroundColor: '$background',
  margin: '$md',
  padding: '$md',
  borderRadius: '$lg',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$sm',
  borderWidth: 1,
  borderColor: '$error',
  pressStyle: {
    backgroundColor: '$gray1',
  },
});

const LogoutText = styled(TamaguiText, {
  fontSize: 16,
  fontWeight: '600',
  color: '$error',
});

const Version = styled(TamaguiText, {
  fontSize: 14,
  color: '$gray10',
  textAlign: 'center',
  paddingVertical: '$xl',
});
