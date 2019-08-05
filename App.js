/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from "react-navigation"

import Login from "./src/screens/Login"
import Home from "./src/screens/Home"
import WorkerSignup from "./src/screens/WorkerSignup"
import ScoreFactors from "./src/screens/ScoreFactors"
import Diagnosis from "./src/screens/Diagnosis"
import PendingLabs from "./src/screens/PendingLabs"
import PendingVisit from "./src/screens/PendingVisit"
import OpenCase from "./src/screens/OpenCase"
import NewCase from "./src/screens/NewCase"
import VisitMaster from "./src/screens/editcase/VisitMaster"
import SelectHospital from "./src/screens/editcase/SelectHospital"
import SelectDoctor from "./src/screens/editcase/SelectDoctor"
import Symptoms from "./src/screens/editcase/Symptoms"
import EditDiagnosis from "./src/screens/editcase/EditDiagnosis"
import Prescription from "./src/screens/editcase/Prescription"
import LabTests from "./src/screens/editcase/LabTests"
import Procedure from "./src/screens/editcase/Procedure"
import SelectProcedureName from "./src/screens/editcase/SelectProcedureName"
import Risks from "./src/screens/editcase/Risks"
import Alternatives from "./src/screens/editcase/Alternatives"
import PostOP from "./src/screens/editcase/PostOP"
import Treats from "./src/screens/editcase/Treats"
import Referal from "./src/screens/editcase/Referal"
import SelectBodyPart from "./src/screens/SelectBodyPart"
import CloseCase from "./src/screens/CloseCase"

const AppNavigator = createStackNavigator ({
  Login: {screen: Login},
  Home: {screen: Home},
  WorkerSignup: {screen: WorkerSignup},
  ScoreFactors: {screen: ScoreFactors},
  Diagnosis: {screen: Diagnosis},
  PendingLabs: {screen: PendingLabs},
  PendingVisit: {screen: PendingVisit},
  OpenCase: {screen: OpenCase},
  NewCase: {screen: NewCase},
  VisitMaster: {screen: VisitMaster},
  SelectHospital: {screen: SelectHospital},
  SelectDoctor: {screen: SelectDoctor},
  Symptoms: {screen: Symptoms},
  EditDiagnosis: {screen: EditDiagnosis},
  Prescription: {screen: Prescription},
  LabTests: {screen: LabTests},
  Procedure: {screen: Procedure},
  SelectProcedureName: {screen: SelectProcedureName},
  Risks: {screen: Risks},
  Alternatives: {screen: Alternatives},
  PostOP: {screen: PostOP},
  Treats: {screen: Treats},
  Referal: {screen: Referal},
  SelectBodyPart: {screen: SelectBodyPart},
  CloseCase: {screen: CloseCase},
  
}, {
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,  // Set the animation duration time as 0 !!
      },
    }),
});
  
const AppNav = createAppContainer(AppNavigator);

export default AppNav;


