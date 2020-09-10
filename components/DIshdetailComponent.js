import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, TextInput, Button, StyleSheet, Alert, PanResponder } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, addComment } from '../redux/ActionCreators';
import StarRating from 'react-native-star-rating';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
  }
const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    addComment: (comment) => dispatch(addComment(comment))
})
function RenderDish(props) {

    const dish = props.dish;
    handlViewRef = ref => this.view = ref;
    const recognizeDrag = ({ moveX, moveY, dx, dy}) => {
        if(dx<-200)
            return true;
        else 
            return false;
    }
    const panResponder =  PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderGrant: () => {
            this.view.rubberBand(1000)
                .then(endState  => console.log(endState.finished ? 'finished' : 'cancelled'));
        },
        onPanResponderEnd: (e, gestureState) => {
            if(recognizeDrag(gestureState))
                Alert.alert(
                    'Add to favorites',
                    `Are you sure that you want to add ${dish.name} to your favorites ?`,
                    [
                        {
                            text:'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style:'cancel'
                        },
                        {
                            text:'OK',
                            onPress: () =>{props.favorite ? console.log('Aleardy favorite') : props.onPress()},
                            style:''
                        }
                    ],
                    {cancelable:false}

                )
            return true;
        }
    })
    
        if (dish != null) {
            return(
                <Animatable.View animation='fadeInDown' duration={2000} delay={1000}
                ref={this.handlViewRef}
                {...panResponder.panHandlers}
                >
                    <Card style={{flex:1}}
                    featuredTitle={dish.name}
                    image={{uri: baseUrl + dish.image}}>
                    
                        <Text style={{margin: 10}}>
                            {dish.description}
                        </Text>
                        <View style={styles.iconCenter}>
                                <Icon
                                    raised
                                    reverse
                                    name={props.favorite ? 'heart' : 'heart-o'}
                                    type='font-awesome'
                                    color='#f50'
                                    onPress={() => props.favorite ? console.log('Aleardy favorite') : props.onPress()}

                                />
                                <Icon
                                    raised
                                    reverse
                                    name='pencil'
                                    type='font-awesome'
                                    color='#512DA8'
                                    onPress={() =>props.handleComment()}

                                />
                        </View>

                    </Card>
                </Animatable.View>
            );
        }
        else {
            return(<View></View>);
        }
}

function RenderComments (props){
    const comments = props.comments;
    const onStarRatingPress = (rating) => {
        this.setState({
          starCount: rating
        });
    }
    const renderCommentItem = ({item, index}) => {
        return(
            <View key={index} style={{margin:10}}>
                <Text style={{fontSize:14}}>{item.comment}</Text>
                <View style={{flexDirection: 'row',justifyContent:'flex-start'}}>
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={item.rating}
                        starSize={20}
                        fullStarColor='#FECE24'
                        // selectedStar={(rating) => onStarRatingPress(rating)}
                    />
                </View>
                <Text style={{fontSize:12}}>{`---${item.author}, ${item.date}`}</Text>
            </View>
        )
    }
    return(
        <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>
            <Card title="Comments">
                <FlatList
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                />
            </Card>
        </Animatable.View>
    );

}

class Dishdetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            favorites:[],
            author:'',
            comment:'',
            showModal:false,
            starCount: 0,
            dishRating:null,
            date:''
        };
    }
    onStarRatingPress(rating) {
        this.setState({
          starCount: rating
        });
    }
    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    handleComment() {
        console.log(JSON.stringify(this.state));
        this.toggleModal();
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }
    SubmitComment(){

        const { author, comment } = this.state;
        const rating = this.state.starCount;
        const newComment = {
            author:author,
            comment:comment,
            rating:rating,
            dishId:this.props.route.params.dishId
        }
        newComment.date = new Date().toISOString();
        this.props.addComment(newComment);
        this.toggleModal();
    }
    resetForm() {
        this.setState({
            author:'',
            comment:'',
            starCount:0
        });
    }

    render() {
        const dishId = this.props.route.params.dishId;
        
        return(
            <ScrollView>
            <RenderDish dish={this.props.dishes.dishes[+dishId]}
                favorite={this.props.favorites.some(el => el === dishId)}
                onPress={() => this.markFavorite(dishId)} 
                handleComment={() => this.handleComment()}
                />
            <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
            <View><Text></Text></View>
            
            <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => this.toggleModal() }
                    onRequestClose = {() => this.toggleModal() }>
                    <View >
                    <View style={{flexDirection: 'row',justifyContent:'center'}}>
                            <Text style={{color:'#FECE24'}}>
                                {`Rating: `}
                                <Text style={{fontSize:24, fontWeight: "bold"}}>
                                {this.state.starCount}
                                </Text>
                                {`/5`}
                            </Text>
                        </View>
                        <View style={{flexDirection: 'row',justifyContent:'center'}}>
                            <StarRating
                                disabled={false}
                                maxStars={5}
                                rating={this.state.starCount}
                                starSize={20}
                                fullStarColor='#FECE24'
                                selectedStar={(rating) => this.onStarRatingPress(rating)}
                            />
                        </View>
                        <View style={{flexDirection: 'row'}} >
                            <Icon 
                                raised
                                reverse
                                size={10}
                                backgroundColor='black'
                                name='user'
                                type='font-awesome'
                            />
                            <TextInput 
                                placeholder="Author"
                                onChangeText={(text) => this.setState({author:text})}
                                defaultValue={this.state.author}
                            />
                        </View>
                        <View style={{flexDirection: 'row',marginBottom:10}} >
                            <Icon 
                                raised
                                reverse
                                size={10}
                                name='comment'
                                type='font-awesome'
                            />
                            <TextInput
                                placeholder="Comment"
                                onChangeText={(text) => this.setState({comment:text})}
                                defaultValue={this.state.comment}
                            />
                        </View>
                            <Button style={{flex:1, marginBottom:15}}
                                color="#512DA8"
                                title="Submit" 
                                onPress={() => {this.SubmitComment(); this.resetForm();}}
                            />
                            <Text></Text>
                            <Button style={{flex:1}}
                                onPress = {() =>{this.toggleModal();this.resetForm();}}
                                color="#a9a9a9"
                                title="Cancel" 
                            />
                    </View>
                </Modal>
        </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    iconCenter: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },

})
export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);