// ignore_for_file: prefer_const_constructors, avoid_unnecessary_containers

import 'package:flutter/material.dart';
import 'package:song_app/commons/card_view_screen.dart';
import 'package:song_app/commons/menu_bottom.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({ Key? key }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Map<String, String> map1 = {'images/entree.jpg': 'Entrée', 'images/kyrie.png': 'Kyrié'};
    Map<String, String> map2 = {'images/gloria.jpg': 'Gloria', 'images/meditation.jpg': 'Psaume'};
    Map<String, String> map3 = {'images/acclamation.jpg': 'Acclamation', 'images/credo.png': 'Credo'};
    Map<String, String> map4 = {'images/pu.png': 'PU', 'images/offertoire.jpg': 'Offertoire'};
    Map<String, String> map5 = {'images/sanctus.png': 'Sanctus', 'images/anamnese.jpg': 'Anamnèse'};
    Map<String, String> map6 = {'images/pater.png': 'Pater', 'images/communion.png': 'Communion'};
    Map<String, String> map7 = {'images/ag.jpg': 'AG', 'images/envoi.jpg': 'Envoi'};
    Map<String, String> map8 = {'images/divers.jpg': '', 'images/programme.jpg': ''};

    return Scaffold(
        appBar: AppBar(
          title: Text('Chants religieux'),
        ),
        body: Container(
          child: ListView(
            // ignore: prefer_const_literals_to_create_immutables
            children: [
              CardViewScreen(map: map1),
              CardViewScreen(map: map2),
              CardViewScreen(map: map3),
              CardViewScreen(map: map4),
              CardViewScreen(map: map5),
              CardViewScreen(map: map6),
              CardViewScreen(map: map7),
              CardViewScreen(map: map8),
            ],
          )
        ),
        bottomNavigationBar: MenuBottom(),
    );
  }
}