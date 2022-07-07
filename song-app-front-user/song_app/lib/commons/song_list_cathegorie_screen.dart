// ignore_for_file: unused_element

import 'package:flutter/material.dart';
import 'package:song_app/commons/menu_bottom.dart';

class SongListCathegorieScreen extends StatelessWidget {
  final String categorie;
  const SongListCathegorieScreen({this.categorie="", Key? key }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Map<String, String> map = {
      '1' : 'titre1',
      '2' : 'titre2',
      '3' : 'titre3',
      '4' : 'titre4',
      '5' : 'titre5',
      '6' : 'titre6',
      '7' : 'titre7',
      '8' : 'titre8',
      '9' : 'titre9',
      '10' : 'titre10',
      '11' : 'titre11',
      '12' : 'titre12',
      '13' : 'titre13',
      '14' : 'titre14',
      '15' : 'titre15'
      };
    
    final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

    return Scaffold(
      appBar: AppBar(
          title: Text(categorie),
      ),
      body: ListView(
        children: _createSongList(songs: map, formKey: _formKey),
      ),
       bottomNavigationBar: MenuBottom(),
    );
  }
}

Widget _songLine({required String id, required String title, Widget? screen}){

  return TextButton(
    child: ListTile(
      horizontalTitleGap: 0.0,
      leading: Text(id),
      title: Text(
        title,
        style: const TextStyle(
          fontSize: 16,
        ),
      ),
      minVerticalPadding: 0,
    ),
    onPressed: (){},
  );
}

List<Widget> _createSongList({required Map<String, String> songs, required GlobalKey<FormState> formKey , Widget? screen}){
  List<Widget> listOfSong = [
    searchForm(formKey: formKey)
  ];

  songs.forEach((id, title){
      var songLine = _songLine(id: id, title: title);
      listOfSong.add(songLine);
  });

  return listOfSong;
}

Widget searchForm({required GlobalKey<FormState> formKey}){
  return Form(
      key: formKey,
      child: Row(
        children: <Widget>[
          Expanded(
            child: Padding(
              padding: const EdgeInsets.only(left: 8.0, right:8.0),
              child: TextFormField(
                decoration: const InputDecoration(
                  hintText: 'Recherche',
                ),
                validator: (String? value) {
                  if (value == null || value.isEmpty) {
                    return 'Ecrivez quelque chose...';
                  }
                  return null;
                },
              ),
            ),
          ),
          TextButton(
            child: const Icon(Icons.search_rounded),
            onPressed: () {
              // Validate will return true if the form is valid, or false if
              // the form is invalid.
              if (formKey.currentState!.validate()) {
                // Process data.
              }
            }
          ),
        ],
      ),
    );
}