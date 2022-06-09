// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:song_app/screens/home_screen.dart';

void main() {
  runApp(SongApp());
}

class SongApp extends StatelessWidget {
  const SongApp({Key? key}) : super(key: key);
  

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      theme: ThemeData(
         colorScheme: ColorScheme.fromSwatch().copyWith(
            primary: const Color(0xFF3949AB),
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
    )
  ];
}

class AppLinks {
  static const String HOME = "/";
}

