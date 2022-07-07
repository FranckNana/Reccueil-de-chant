import 'package:flutter/material.dart';
import 'package:song_app/commons/menu_bottom.dart';

class SearchScreen extends StatelessWidget {
  const SearchScreen({ Key? key }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Recherche'),
      ),
      bottomNavigationBar: MenuBottom(selectedPage:1),
    );
  }
}