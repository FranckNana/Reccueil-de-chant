import 'package:flutter/material.dart';
import 'package:song_app/commons/menu_bottom.dart';

class InformationScreen extends StatelessWidget {
  const InformationScreen({ Key? key }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
       appBar: AppBar(
        title: const Text('Informations'),
      ),
      bottomNavigationBar: MenuBottom(selectedPage:3),
    );
  }
}