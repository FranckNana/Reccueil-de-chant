class Partition {
  String id;
  String date;
  String name;
  String url;

  Partition({this.id='', this.date='', required this.name, required this.url});

  Map<String, dynamic> toJson(){
    return {
      'id': id,
      'date': date,
      'name': name,
      'url' : url,
    };
  }

  factory Partition.fromJson(Map<String, dynamic> json){
    return Partition(id: json['id'], date: json['date'], name: json['name'], url: json['url']);
  }
}