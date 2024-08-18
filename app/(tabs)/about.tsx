import React from 'react';
import { View, Text, ScrollView, StyleSheet, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const AboutSection: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const Feature: React.FC<{ icon: string; text: string }> = ({ icon, text }) => (
  <View style={styles.feature}>
    <MaterialIcons name={icon} size={24} color="#00FFFF" />
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

const About: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Video Player App</Text>
      <Text style={styles.version}>Version 1.0.0</Text>

      <AboutSection title="About This App">
        <Text style={styles.text}>
          Video Player App is a powerful and user-friendly tool for editing
          videos on your mobile device. With our app, you can trim videos, add
          text overlays, and create stunning visual content with ease.
        </Text>
      </AboutSection>

      <AboutSection title="Key Features">
        <Feature icon="videocam" text="Smooth video playback and scrubbing" />
        <Feature icon="title" text="Add and edit text overlays" />
        <Feature icon="content-cut" text="Trim videos with precision" />
        <Feature icon="image" text="Generate and view thumbnails" />
        <Feature icon="save" text="Save and export your edited videos" />
      </AboutSection>

      <AboutSection title="Technologies Used">
        <Text style={styles.text}>
          Built with React Native and Expo, leveraging powerful libraries like
          FFmpeg for video processing.
        </Text>
      </AboutSection>

      <Text
        style={styles.link}
        onPress={() =>
          Linking.openURL('https://github.com/lironsfadia/VideoPlayer')
        }
      >
        Visit our GitHub repository
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000080',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: '#FF00FF',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  version: {
    fontSize: 16,
    color: '#00FFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF00FF',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 10,
  },
  link: {
    fontSize: 16,
    color: '#00FFFF',
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginTop: 20,
  },
});

export default About;
