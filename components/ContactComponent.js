import React, { Component } from 'react'
import { Text } from 'react-native'
import { Card, Button, Icon } from 'react-native-elements'
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';

function ContactUs (props) {

    return(

        <Card title="Contact Information">
            <Text>
                {`121, Clear Water Bay Road\n
Clear Water Bay, Kowloon \n
HONG KONG\n
Tel: +852 1234 5678\n
Fax: +852 8765 4321\n
Email:confusion@food.net`}
            </Text>
            <Button
                    title="Send Email"
                    buttonStyle={{backgroundColor: "#512DA8"}}
                    icon={<Icon containerStyle={{marginRight:5}} name='envelope-o' type='font-awesome' color='white' />}
                    onPress={props.sendMail}
                    containerStyle={{margin:10}}
            />
        </Card>
    )
}

class Contact extends Component {
    sendMail() {
        MailComposer.composeAsync({
            recipients: ['confusion@food.net'],
            subject: 'Enquiry',
            body: 'To whom it may concern:'
        })
    }
    render() {
        return (
            <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                <ContactUs sendMail={this.sendMail}/>
            </Animatable.View>
        )
    }
}

export default Contact;
