import React, { useState } from 'react';
import { View, Animated, FlatList, Text, Dimensions, TouchableOpacity, Modal, StyleSheet, Image } from 'react-native';
import CardComponent from '../components/OrganizationCard';

const { width } = Dimensions.get('window');

const organizations = [
  {
    id: '1',
    name: 'Mosawa',
    image: require('../../assets/images/Figma/Rectangle (2).png'),
    logo: require('../../assets/images/Figma/Rectangle (5).png'),
    description: 'whatsapp: +972 053-924-052',
  },
  {
    id: '2',
    name: 'Sikuy',
    image: require('../../assets/images/Figma/Rectangle (3).png'),
    logo: require('../../assets/images/Figma/Rectangle (6).png'),
    description: 'whatsapp: +972 053-924-052',
  },
  {
    id: '3',
    name: 'Zazim',
    image: require('../../assets/images/Figma/Rectangle (4).png'),
    logo: require('../../assets/images/Figma/Rectangle (7).png'),
    description: 'whatsapp: +972 053-924-052',
  },
];

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const OrganizationCarouselPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const scrollX = new Animated.Value(0);

  const handleChatPress = (org) => {
    setSelectedOrg(org); // Open the modal with the organization's info
  };

  return (
    <View style={styles.container}>
      {/* Title Box */}
      <View style={styles.titleBox}>
        <Text style={styles.mainTitle}>Follow-Up Assistance</Text>
        <Text style={styles.subTitle}>Feeling as though it's not moving forward?{"\n"}Need help with your report?</Text>
      </View>

      {/* FlatList for Organizations */}
      <AnimatedFlatList
        data={organizations}
        horizontal
        pagingEnabled
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.9, 1, 0.9],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View style={[styles.cardWrapper, { transform: [{ scale }] }]}>
              <CardComponent title={item.name} description={item.description} image={item.image} />

              {/* Chat Button */}
              <TouchableOpacity style={styles.chatButton} onPress={() => handleChatPress(item)}>
                <Text style={styles.chatButtonText}>Chat</Text>
              </TouchableOpacity>
            </Animated.View>
          );
        }}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const contentOffsetX = e.nativeEvent.contentOffset.x;
          setActiveIndex(Math.floor(contentOffsetX / width));
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
      />

      {/* Indicator Dots */}
      <View style={styles.indicatorContainer}>
        {organizations.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setActiveIndex(index)}
            style={[
              styles.indicator,
              index === activeIndex && styles.activeIndicator,
            ]}
          />
        ))}
      </View>

      {/* Chat Popup Modal */}
      {selectedOrg && (
        <Modal animationType="slide" transparent={true} visible={!!selectedOrg}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* Small Circular Logo */}
              <Image source={selectedOrg.logo} style={styles.logo} />

              {/* Organization Info */}
              <Text style={styles.modalTitle}>{selectedOrg.name}</Text>
              <Text style={styles.modalDescription}>{selectedOrg.description}</Text>

              {/* Close Button */}
              <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedOrg(null)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginTop: 20 },

  // Title Box Styles
  titleBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    width: width - 40,
  },
  mainTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#04445E',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 16,
    color: '#04445E',
    textAlign: 'center',
    marginTop: 10,
  },

  // Card Wrapper
  cardWrapper: {
    width: width - 60,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    margin: 5,
  },
  activeIndicator: {
    backgroundColor: '#FFD700',
  },

  // Chat Button
  chatButton: {
    backgroundColor: '#04445E',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  chatButtonText: {
    fontSize: 18,
    color: '#FFDE59',
    fontWeight: 'bold',
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: width - 60,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#04445E',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#FFDE59',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 10,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#04445E',
    fontWeight: 'bold',
  },
});

export default OrganizationCarouselPage;
