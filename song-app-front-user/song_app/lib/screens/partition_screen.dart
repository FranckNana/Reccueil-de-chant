// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:song_app/commons/menu_bottom.dart';
import 'package:song_app/screens/home_screen.dart';

class PartitionScreen extends StatelessWidget {
  const PartitionScreen({ Key? key }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return WillPopScope(

      onWillPop: () async { 
        Get.off(HomeScreen());
        return true;
      },

      child: Scaffold(
        appBar: AppBar(
          title: const Text('Partitions'),
          automaticallyImplyLeading: false,
        ),
        bottomNavigationBar: MenuBottom(selectedPage:2),
      ),
    );
  }
}