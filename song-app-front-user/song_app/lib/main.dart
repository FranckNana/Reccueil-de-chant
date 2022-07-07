// ignore_for_file: prefer_const_constructors, constant_identifier_names

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:song_app/commons/song_list_cathegorie_screen.dart';
import 'package:song_app/screens/home_screen.dart';
import 'package:song_app/screens/information_screen.dart';
import 'package:song_app/screens/partition_screen.dart';
import 'package:song_app/screens/search_screen.dart';
import 'package:firebase_core/firebase_core.dart';

void main() async{
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(SongApp());
}

class SongApp extends StatelessWidget {
  const SongApp({Key? key}) : super(key: key);
  

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      theme: ThemeData(
         colorScheme: ColorScheme.fromSwatch().copyWith(
            primary: const Color(0xFF33691E),
          ),
      ),
      debugShowCheckedModeBanner: false,
      initialRoute: AppLinks.HOME,
      getPages: AppRoutes.pages,
    );
  }
}

class AppRoutes {
  static final pages = [
    GetPage(
      name: AppLinks.HOME,
      page: () => HomeScreen()
    ),
    GetPage(
      name: AppLinks.SEARCH,
      page: () => SearchScreen()
    ),
    GetPage(
      name: AppLinks.SONGLISTVIEW,
      page: () => SongListCathegorieScreen()
    ),
    GetPage(
      name: AppLinks.PARTITIONS,
      page: () => PartitionScreen()
    ),
    GetPage(
      name: AppLinks.INFOS,
      page: () => InformationScreen()
    )
  ];
}

class AppLinks {
  static const String HOME = "/";
  static const String SEARCH = "/search";
  static const String SONGLISTVIEW = "/songListView";
  static const String PARTITIONS = "/partitiions";
  static const String INFOS = "/informations";
}

