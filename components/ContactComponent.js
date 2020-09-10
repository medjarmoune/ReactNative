import React, { Component } from 'react'
import { Text } from 'react-native'
import { Card } from 'react-native-elements'
import * as Animatable from 'react-native-animatable';

function ContactUs () {

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
        </Card>
    )
}

class Contact extends Component {
    render() {
        return (
            <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                <ContactUs/>
            </Animatable.View>
        )
    }
}

export default Contact;
