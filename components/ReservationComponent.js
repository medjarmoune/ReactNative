import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Modal, Alert, Platform } from 'react-native';
import * as Animatable from 'react-native-animatable';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import * as Calendar from 'expo-calendar';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Icon, Input } from 'react-native-elements';
import moment from 'moment'

class Reservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guests: 1,
            smoking: false,
            date: '',
            showModal: false,
            isVisible: false,
            iconColor: false

        }
    }
    handleReservation() {
        console.log(JSON.stringify(this.state));
        // this.toggleModal();
        Alert.alert(
            'Your Reservation OK ?',
            `Number of Guests :${this.state.guests}\nSmoking : ${(this.state.smoking) ? 'Yes' : 'No'}\nDate : ${this.state.date}`,
            [
                {
                    text: 'cancel',
                    onPress: () => { console.log(' Reservation Cancelled'); this.resetForm() },
                    style: 'cancel'

                },
                {
                    text: 'OK',
                    onPress: () => {
                        this.addReservationToCalendar(this.state.date);
                        this.presentLocalNotification(this.state.date);
                        this.resetForm();
                    },

                }
            ],
            { cancelable: false },


        )

    }
    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }
    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: '',
            showModal: false,
            iconColor: false

        });
    }
    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notification')
            }
        }
        return permission;
    }
    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();
        Notifications.presentNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for ' + date + ' requested',
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8'
            }
        });
    }
    async obtainCalenderPermission() {
        let permission = await Permissions.getAsync(Permissions.CALENDAR);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.CALENDAR);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to access Calender');
            }
        }
        return permission;
    }

    async getDefaultCalendarSource() {
        const calendars = await Calendar.getCalendarsAsync();
        const defaultCalendars = calendars.filter(each => each.source.name === 'Default');
        return defaultCalendars[0].source;
    }

    async createCalendar() {
        const defaultCalendarSource =
            Platform.OS === 'ios'
                ? await this.getDefaultCalendarSource()
                : { isLocalAccount: true, name: 'Expo Calendar' };
        const newCalendarID = await Calendar.createCalendarAsync({
            title: 'Expo Calendar',
            color: 'blue',
            entityType: Calendar.EntityTypes.EVENT,
            sourceId: defaultCalendarSource.id,
            source: defaultCalendarSource,
            name: 'internalCalendarName',
            ownerAccount: 'personal',
            accessLevel: Calendar.CalendarAccessLevel.OWNER,
        });
        return newCalendarID;
    }

    async getCalendarId() {
        const calendars = await Calendar.getCalendarsAsync();
        const defaultCalendars = calendars.filter(each => each.title === 'Expo Calendar');
        if (defaultCalendars.length !== 0)
            return defaultCalendars[0].id;
        else
            await this.createCalendar();
    }

    async addReservationToCalendar(date) {
        await this.obtainCalenderPermission();
        const calendarId = await this.getCalendarId();
        try{
            Calendar.createEventAsync(calendarId, {
                title: 'Con Fusion Table Reservation',
                startDate: new Date(Date.parse(date)),
                endDate: new Date(Date.parse(date) + (2 * 60 * 60 * 1000)),
                timeZone: 'Asia/Hong_Kong',
                location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'
            })
        }
        catch(e){
            Alert.alert('you cant access to the calendar');
        }
    }

    // async obtainCalendarPermission() {
    //     let permission = await Permissions.getAsync(Permissions.CALENDAR);
    //     if (permission.status !== 'granted') {
    //         permission = await Permissions.askAsync(Permissions.CALENDAR);
    //         if (permission.status !== 'granted') {
    //             Alert.alert('Permission not granted to access to calendar');
    //         }
    //     }
    //     return permission;
    // }
    // addReservationToCalendar = async (date) => {

    //     await this.obtainCalendarPermission();

    //     let dateMs = Date.parse(date);
    //     let startDate = new Date(dateMs);
    //     let endDate = new Date(dateMs + 2 * 60 * 60 * 1000);

    //     try {
    //         await Calendar.createEventAsync(null, {
    //             title: "Con Fusion",
    //             startDate: startDate,
    //             endDate: endDate,
    //             allDay: true,
    //             location: "121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong",
    //             timeZone: "GMT+1",
    //             name: "internalCalendarName"
    //         });
    //         Alert.alert('Reservation has been added to your calendar');
    //     }
    //     catch (e) {
    //         console.log(e);
    //     }
    // }
    render() {
        const showPicker = () => {
            this.setState({
                isVisible: true
            })
        }
        const handleConfirm = (Date) => {
            this.setState({
                isVisible: false,
                // date: moment(datetime).format('DD-MM-YYYY HH:mm'),
                date: String(Date),
                iconColor: true
            });
        }
        const hideDatePicker = () => {
            this.setState({
                isVisible: false
            })
        }
        const { date } = this.state;
        return (
            <ScrollView>
                <Animatable.View animation='zoomIn' duration={2000} delay={1000}>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Number of Guests</Text>
                        <Picker
                            style={styles.formItem}
                            selectedValue={this.state.guests}
                            onValueChange={(itemValue, itemIndex) => this.setState({ guests: itemValue })}>
                            <Picker.Item label="1" value="1" />
                            <Picker.Item label="2" value="2" />
                            <Picker.Item label="3" value="3" />
                            <Picker.Item label="4" value="4" />
                            <Picker.Item label="5" value="5" />
                            <Picker.Item label="6" value="6" />
                        </Picker>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                        <Switch
                            style={styles.formItem}
                            value={this.state.smoking}
                            onTintColor='#512DA8'
                            onValueChange={(value) => this.setState({ smoking: value })}>
                        </Switch>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>
                            Date and time
                        </Text>
                        <Icon
                            name='calendar'
                            type='font-awesome'
                            onPress={showPicker}
                            color={(this.state.iconColor) ? '#512DA8' : 'black'}
                        />
                        <View style={{ flex: 2, flexDirection: 'row' }}>
                            <Input
                                placeholder='JJ/MM/YYYY'
                                onChangeText={(date) => this.setState({ date: date, iconColor: (date !== '') ? true : false })}
                                value={this.state.date}
                            />
                        </View>
                        <DateTimePickerModal
                            isVisible={this.state.isVisible}
                            mode="datetime"
                            onConfirm={(Date) => {
                                this.setState({date: String(Date), isVisible:false, iconColor:true});
                                hideDatePicker;}}
                            onCancel={hideDatePicker}
                            is24Hour={true}
                        />
                    </View>
                    <View style={styles.formRow}>
                        <Button
                            onPress={() => this.handleReservation()}
                            title="Reserve"
                            color="#512DA8"
                            accessibilityLabel="Learn more about this purple button"
                        />
                    </View>
                </Animatable.View>

                <Modal animationType={"slide"} transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => this.toggleModal()}
                    onRequestClose={() => this.toggleModal()}>
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Your Reservation</Text>
                        <Text style={styles.modalText}>Number of Guests: {this.state.guests}</Text>
                        <Text style={styles.modalText}>Smoking?: {this.state.smoking ? 'Yes' : 'No'}</Text>
                        <Text style={styles.modalText}>Date and Time: {this.state.date}</Text>

                        <Button
                            onPress={() => { this.toggleModal(); this.resetForm(); }}
                            color="#512DA8"
                            title="Close"
                        />
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20,
    },
    formLabel: {
        fontSize: 18,
        flex: 2,
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default Reservation;
