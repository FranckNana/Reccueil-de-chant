// ignore_for_file: prefer_const_constructors, must_be_immutable
import 'package:convex_bottom_bar/convex_bottom_bar.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:song_app/screens/home_screen.dart';
import 'package:song_app/screens/information_screen.dart';
import 'package:song_app/screens/partition_screen.dart';
import 'package:song_app/screens/search_screen.dart';

class MenuBottom extends StatelessWidget {
  int selectedPage = 0;
  MenuBottom({this.selectedPage = 0, Key? key }) : super(key: key);

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

      initialActiveIndex: selectedPage,

      onTap: (int index) {
        switch (index) {
          case 0:
            Get.off(HomeScreen());
            break;
          case 1:
            Get.off(SearchScreen());
            break;
          case 2:
            Get.off(PartitionScreen());
            break;
          case 3:
            Get.off(InformationScreen());
            break;
        }
      },

      backgroundColor: const Color(0xFF33691E)

    );
  }
  
}