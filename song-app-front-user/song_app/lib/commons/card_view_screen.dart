// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';

class CardViewScreen extends StatelessWidget {
  final Map<String, String> map;
  const CardViewScreen({required this.map, Key? key }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final sizeX = MediaQuery.of(context).size.width;
    final sizeY = MediaQuery.of(context).size.height;
    
    return Container(
      margin: EdgeInsets.only(left: 15, right: 15, top: 10),
      width: sizeX,
      height: sizeY*2/9,
      child: GridView.count(
        scrollDirection: Axis.horizontal,
        crossAxisCount: 1,
        children: _createCardView(map),
        mainAxisSpacing: 5.0,
        crossAxisSpacing: 5.0,
      ),
    );
  }
}

List<Widget> _createCardView(Map<String, String> map){
  List<Widget> images = [];
  Widget image;
  map.forEach((imageUrl, title) {   // key = imageUrl et value = title
    image = InkWell(
      onTap: () { 
        //Get.to(ViewSinglePromotor()); 
      },
      child: Card(
        elevation: 5,
        child: Container(
          decoration: BoxDecoration(
            image: DecorationImage(
              image:AssetImage(imageUrl),
              fit: BoxFit.fitHeight, 
            ),
            borderRadius: BorderRadius.circular(8.0),
          ),
          child: SizedBox(
            child: Stack(
              alignment: Alignment.bottomLeft,
              children: [
                Text(
                  title,
                  textAlign: TextAlign.left,
                  style: TextStyle(
                    fontSize: 22,
                    fontWeight: FontWeight.bold,
                    fontStyle: FontStyle.italic
                  ),
                ),
              ],
            )
          ),
        ),
      ),
    );
    images.add(image);
  });
  
  return images;
}
