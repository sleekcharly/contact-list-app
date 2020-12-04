import React from "react";
import { StyleSheet, View } from "react-native";

import ContactThumbnail from "../components/ContactThumbnail";
import DetailListItem from "../components/DetailListItem";

import { fetchRandomContact } from "../utils/api";

import colors from "../utils/colors";
import store from "../store";

export default class Profile extends React.Component {
  state = store.getState();

  render() {
    const {
      route: { params },
    } = this.props;
    const { id } = params;
    const { avatar, name, email, phone, cell } = this.state.contacts.find(
      (contact) => contact.id === id
    );

    return (
      <View style={styles.container}>
        <View style={styles.avatarSection}>
          <ContactThumbnail avatar={avatar} name={name} phone={phone} />
        </View>
        <View style={styles.detailsSection}>
          <DetailListItem icon="mail" title="Email" subtitle={email} />
          <DetailListItem icon="phone" title="Work" subtitle={phone} />
          <DetailListItem icon="smartphone" title="Personal" subtitle={cell} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.blue,
  },
  detailsSection: {
    flex: 1,
    backgroundColor: "white",
  },
});
