import React, {Fragment, Component} from 'react';
import {
    YellowBox,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
  Linking,
  Share,
  Platform,
  Alert
} from 'react-native';

import {getInset} from 'react-native-safe-area-view'

const base64 = require('base-64');
import { SkypeIndicator } from 'react-native-indicators';
import Global from '../utils/Global/Global'

YellowBox.ignoreWarnings(["Warning:"]);

const topOffset = getInset('top');
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
var menu_bar_height = 50;
var top_view_height = 100;
var safearea_height = deviceHeight - getInset('top') - getInset('bottom');
var group_view_height = Platform.OS == "ios" ? safearea_height - menu_bar_height - top_view_height : safearea_height - menu_bar_height - top_view_height - StatusBar.currentHeight;
var item_width = deviceWidth * 0.9 * 0.3;

export default class Home extends Component {
    static navigationOptions = {
        header: null,
        headerBackTitle: null,
	};

    constructor(props){
		super(props);

		this.state = {
            showIndicator: false,

            item_array: [],
            final_score: 0,
            header_url: '',
            header_text: '',
            show_rightmenu: false
		}
    }

    async UNSAFE_componentWillMount() {
        
    }

    componentDidMount() {
        this.props.navigation.addListener('willFocus', this.init_dashboard.bind(this));
    }

    init_dashboard = async() => {
        this.setState({
            show_rightmenu: false
        })
        this.setState({showIndicator: true})
        await fetch(Global.base_url + '/dash/admin', {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + base64.encode(Global.user_name + ":" + Global.password)
            }
        })
        .then(response => response.json())
        .then(async data => {
            var item_array = [];
            for(i = 0; i < data.length; i ++) {
                if(data[i].position != 10) {
                    item_array.push(data[i]);
                } else {
                    this.setState({
                        final_score: data[i].cantidad
                    })
                    if(data[i].cantidad > 725) {
                        this.setState({
                            header_url: require('../assets/images/score725.png'),
                            header_text: 'Excellent'
                        })
                    } else if(data[i].cantidad > 675) {
                        this.setState({
                            header_url: require('../assets/images/score675.png'),
                            header_text: 'Good'
                        })
                    } else if(data[i].cantidad > 625) {
                        this.setState({
                            header_url: require('../assets/images/score625.png'),
                            header_text: 'Fair'
                        })
                    } else if(data[i].cantidad > 525) {
                        this.setState({
                            header_url: require('../assets/images/score525.png'),
                            header_text: 'Bad'
                        })
                    } else if(data[i].cantidad > 425) {
                        this.setState({
                            header_url: require('../assets/images/score425.png'),
                            header_text: 'Reckless'
                        })
                    } else {
                        this.setState({
                            header_url: '',
                            header_text: 'None'
                        })
                    }
                }
            }
            this.setState({
                item_array: item_array
            })
        })
        .catch(function(error) {
            Alert.alert('Warning!', "Netework error");
        });
        this.setState({showIndicator: false})
    }

    go_detail_screen = (item_title) => {
        this.props.navigation.navigate("ScoreFactors");
    }


    render() {
        if(this.state.showIndicator)
        {
            return (
            <View style = {{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', opacity: 0.3, zIndex: 100}}>
                <View style = {{flex: 1}}>
                    <SkypeIndicator color = '#ffffff' />
                </View>
            </View>
            )
        }
        return (
        <SafeAreaView style = {styles.container}>
            
            <View style = {styles.menu_bar}>
                <View style = {{width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity>
                        <Image style = {{width: 25, height: 25}} resizeMode = {'contain'} source={require('../assets/images/menu_left.png')}/>
                    </TouchableOpacity>
                </View>
                <View style = {{width: '65%', height: '100%', justifyContent: 'center'}}>
                    <Text style = {{fontSize: 18, color: '#ffffff'}}>PampIndex</Text>
                </View>
                <View style = {{width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity onPress = {() => {this.setState({show_rightmenu: !this.state.show_rightmenu})}}>
                        <Image style = {{width: 25, height: 25}} resizeMode = {'contain'} source={require('../assets/images/menu_right.png')}/>
                    </TouchableOpacity>
                </View>
            </View>
        {
            this.state.show_rightmenu &&
            <View style = {{width: deviceWidth, height: deviceHeight, left: 0, right: 0, position: 'absolute', zIndex: 10}} onStartShouldSetResponder={() => this.setState({show_rightmenu: false})}/>
        }
        {
            this.state.show_rightmenu &&
            <View style = {styles.right_menu_view}>
                <TouchableOpacity style = {styles.menu_item_view}>
                    <Text style = {styles.menu_text}>My Account</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.menu_item_view}>
                    <Text style = {styles.menu_text}>Contact Us</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.menu_item_view}>
                    <Text style = {styles.menu_text}>Disclaimer</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.menu_item_view} onPress = {() => this.props.navigation.navigate("Login")}>
                    <Text style = {styles.menu_text}>Log out</Text>
                </TouchableOpacity>
            </View>
        }
            <View style = {{width: '100%', height: top_view_height, alignItems: 'center', padding: 5}}>
                <View style = {{width: '100%', height: '100%', flexDirection: 'row', backgroundColor: '#ffffff', borderColor: '#c0c0c0', borderWidth: 1}}>
                    <View style = {{width: '30%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                        <Image style = {{width: 80, height: 80}} resizeMode = {'contain'} source={this.state.header_url}/>
                    </View>
                    <View style = {{width: '40%', height: '100%', justifyContent: 'center'}}>
                        <Text style = {{fontSize: 16, color: '#ff0000', marginBottom: 5}}>{this.state.header_text}</Text>
                        <Text style = {{fontSize: 14, fontWeight: 'bold', color: '#000000', marginBottom: 5}}>pamp-index score</Text>
                        <Text style = {{fontSize: 12, color: '#ff0000'}}>Lock at your Records</Text>
                    </View>
                    <View style = {{width: '30%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style = {{fontSize: 24, fontWeight: 'bold', color: '#3aa1f4'}}>{this.state.final_score}</Text>
                    </View>
                </View>
            </View>
        {
            this.state.item_array.length != 0 &&
            <View style = {{width: '100%', height: group_view_height, alignItems: 'center', justifyContent: 'center'}}>
                <View style = {{width: deviceWidth * 0.9, height: deviceWidth * 0.9, justifyContent: 'space-between'}}>
                    <View style = {{width: '100%', height: '30%', justifyContent: 'space-between', flexDirection: 'row'}}>
                        <TouchableOpacity style = {styles.item_style} onPress = {() => this.props.navigation.navigate("OpenCase")}>
                        {
                            this.state.item_array[0].cantidad != 0 &&
                            <View style = {styles.badge_view}>
                                <Text style = {styles.badge_text}>{this.state.item_array[0].cantidad}</Text>
                            </View>
                        }
                            <Image style = {styles.item_icon} resizeMode = {'contain'} source={require('../assets/images/main_open.png')}/>
                            <Text style = {styles.item_text}>{this.state.item_array[0].dashName}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.item_style} onPress = {() => this.props.navigation.navigate("CloseCase")}>
                        {
                            this.state.item_array[1].cantidad != 0 &&
                            <View style = {styles.badge_view}>
                                <Text style = {styles.badge_text}>{this.state.item_array[1].cantidad}</Text>
                            </View>
                        }
                            <Image style = {styles.item_icon} resizeMode = {'contain'} source={require('../assets/images/main_close.png')}/>
                            <Text style = {styles.item_text}>{this.state.item_array[1].dashName}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.item_style} onPress = {() => this.go_detail_screen(this.state.item_array[2].dashName)}>
                        {
                            this.state.item_array[2].cantidad != 0 &&
                            <View style = {styles.badge_view}>
                                <Text style = {styles.badge_text}>{this.state.item_array[2].cantidad}</Text>
                            </View>
                        }
                            <Image style = {styles.item_icon} resizeMode = {'contain'} source={require('../assets/images/main_board.png')}/>
                            <Text style = {styles.item_text}>{this.state.item_array[2].dashName}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {{width: '100%', height: '30%', justifyContent: 'space-between', flexDirection: 'row'}}>
                        <TouchableOpacity style = {styles.item_style}>
                        {
                            this.state.item_array[3].cantidad != 0 &&
                            <View style = {styles.badge_view}>
                                <Text style = {styles.badge_text}>{this.state.item_array[3].cantidad}</Text>
                            </View>
                        }
                            <Image style = {styles.item_icon} resizeMode = {'contain'} source={require('../assets/images/main_chat.png')}/>
                            <Text style = {styles.item_text}>{this.state.item_array[3].dashName}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.item_style}>
                        {
                            this.state.item_array[4].cantidad != 0 &&
                            <View style = {styles.badge_view}>
                                <Text style = {styles.badge_text}>{this.state.item_array[4].cantidad}</Text>
                            </View>
                        }
                            <Image style = {styles.item_icon} resizeMode = {'contain'} source={require('../assets/images/main_advice.png')}/>
                            <Text style = {styles.item_text}>{this.state.item_array[4].dashName}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.item_style} onPress = {() => this.props.navigation.navigate("PendingLabs")}>
                        {
                            this.state.item_array[5].cantidad != 0 &&
                            <View style = {styles.badge_view}>
                                <Text style = {styles.badge_text}>{this.state.item_array[5].cantidad}</Text>
                            </View>
                        }
                            <Image style = {styles.item_icon} resizeMode = {'contain'} source={require('../assets/images/main_pendingwork.png')}/>
                            <Text style = {styles.item_text}>{this.state.item_array[5].dashName}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {{width: '100%', height: '30%', justifyContent: 'space-between', flexDirection: 'row'}}>
                        <TouchableOpacity style = {styles.item_style} onPress = {() => this.props.navigation.navigate("PendingVisit", {prev_screen: "Home", caseNumber: -1})}>
                        {
                            this.state.item_array[6].cantidad != 0 &&
                            <View style = {styles.badge_view}>
                                <Text style = {styles.badge_text}>{this.state.item_array[6].cantidad}</Text>
                            </View>
                        }
                            <Image style = {styles.item_icon} resizeMode = {'contain'} source={require('../assets/images/main_pendingvisit.png')}/>
                            <Text style = {styles.item_text}>{this.state.item_array[6].dashName}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.item_style} onPress = {() => this.props.navigation.navigate("Diagnosis")}>
                        {
                            this.state.item_array[7].cantidad != 0 &&
                            <View style = {styles.badge_view}>
                                <Text style = {styles.badge_text}>{this.state.item_array[7].cantidad}</Text>
                            </View>
                        }
                            <Image style = {styles.item_icon} resizeMode = {'contain'} source={require('../assets/images/main_heart.png')}/>
                            <Text style = {styles.item_text}>{this.state.item_array[7].dashName}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.item_style}>
                        {
                            this.state.item_array[8].cantidad != 0 &&
                            <View style = {styles.badge_view}>
                                <Text style = {styles.badge_text}>{this.state.item_array[8].cantidad}</Text>
                            </View>
                        }
                            <Image style = {styles.item_icon} resizeMode = {'contain'} source={require('../assets/images/main_group.png')}/>
                            <Text style = {styles.item_text}>{this.state.item_array[8].dashName}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        }
        </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
        // alignItems: 'center'
    },
    menu_bar: {
        width: '100%',
        height: menu_bar_height,
        backgroundColor: '#445774',
        flexDirection: 'row'
    },
    item_style: {
        width: '30%', 
        height: '100%', 
        borderWidth: 1, 
        borderColor: '#000000', 
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    item_icon: {
        width: '50%',
        height: '50%'
    },
    item_text: {
        fontSize: 12,
        color: '#000000'
    },
    badge_view: {
        width: 20,
        height: 20,
        top: 5,
        right: 5,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#ff0000'
    },
    badge_text: {
        fontSize: 10,
        color: '#ffffff'
    },
    right_menu_view: {
        width: 200,
        height: 160,
        position: 'absolute',
        top: menu_bar_height + topOffset,
        right: 5,
        backgroundColor: '#fafafa',
        zIndex: 10,
        borderColor: '#808080',
        borderWidth: 1
    },
    menu_item_view: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        paddingLeft: 5
    },
    menu_text: {
        fontSize: 16,
        color: '#000000'
    }
})