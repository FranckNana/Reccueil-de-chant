// ignore_for_file: prefer_const_constructors, avoid_unnecessary_containers

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:song_app/commons/card_view_screen.dart';
import 'package:song_app/commons/menu_bottom.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({ Key? key }) : super(key: key);

  @override
  Widget build(BuildContext context) {

    Map<String, String> map = {
      'images/entree.jpg': 'Entrée', 'images/kyrie.png': 'Kyrié',
      'images/gloria.jpg': 'Gloria', 'images/meditation.jpg': 'Psaume',
      'images/acclamation.jpg': 'Acclamation', 'images/credo.png': 'Credo',
      'images/pu.png': 'PU', 'images/offertoire.jpg': 'Offertoire',
      'images/sanctus.png': 'Sanctus', 'images/anamnese.jpg': 'Anamnèse',
      'images/pater.png': 'Pater', 'images/communion.png': 'Communion',
      'images/ag.jpg': 'AG', 'images/envoi.jpg': 'Envoi',
      'images/divers.jpg': '', 'images/programme.jpg': ''
    };

    return WillPopScope(

      onWillPop: () async { 
        Get.off(HomeScreen());
        return true;
      },

      child: Scaffold(
          appBar: AppBar(
            title: Text('Chants religieux'),
            automaticallyImplyLeading: false,
          ),
          body: Container(
            child: ListView(
              // ignore: prefer_const_literals_to_create_immutables
              children: [
                CardViewScreen(map: map)
              ],
            )
          ),
          bottomNavigationBar: MenuBottom(),
      ),
    );
  }
}