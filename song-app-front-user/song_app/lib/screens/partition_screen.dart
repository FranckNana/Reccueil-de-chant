// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';
import 'package:song_app/commons/menu_bottom.dart';

class PartitionScreen extends StatelessWidget {
  const PartitionScreen({ Key? key }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Partitions'),
      ),
      bottomNavigationBar: MenuBottom(selectedPage:2),
    );
  }
}