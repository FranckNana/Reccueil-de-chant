// ignore_for_file: prefer_const_constructors, must_be_immutable
import 'package:convex_bottom_bar/convex_bottom_bar.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:song_app/screens/home_screen.dart';

class MenuBottom extends StatelessWidget {
  MenuBottom({Key? key }) : super(key: key);

  @override
  Widget build(BuildContext context) {

    return ConvexAppBar(
      
      // ignore: prefer_const_literals_to_create_immutables
      items: [
        TabItem(icon: Icons.home_sharp, title: 'Accueil'),
        TabItem(icon: Icons.search_sharp, title: 'Recherche'),
        TabItem(icon: Icons.music_note_sharp, title: 'Partitions'),
        TabItem(icon: Icons.info_sharp, title: 'Informations'),
      ],

      onTap: (int index) {
        switch (index) {
          case 0:
            Get.off(HomeScreen());
            break;
          case 1:
            //Get.off();
            break;
          case 2:
            //Get.off();
            break;
          case 3:
            //Get.off();
            break;
        }
      },

      backgroundColor: Colors.indigo

    );
  }
  
}