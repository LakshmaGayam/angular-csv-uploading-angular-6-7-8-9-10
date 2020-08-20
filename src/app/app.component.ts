import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;
  records: any = [];
  fileReaded: any;
  getFile(event){
      let temp: any;

this.fileReaded = event.target.files[0];
 const reader: FileReader = new FileReader();
 
    reader.readAsText(this.fileReaded);
    reader.onload = (e) =>{
       let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/)
        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray);
        // THIS LINE FOR IF WE GET EMPTY OBJECT AT LAST INDEX FOR REMOVE OF LAST EMPTY OBJECT THIS LINE WILL BE USED
        this.records.pop();
        console.log(this.records ,'any')
    }
  }
  /// this method to get row data;
 getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength?: any) {
    let csvArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');
        let csvRecord: CSVRecord = new CSVRecord();
        csvRecord.id = curruntRecord[0].trim() ? curruntRecord[0].trim():' ';
        csvRecord.name =  curruntRecord[1] ? curruntRecord[1].trim() : '';
        csvRecord.salary = curruntRecord[2] ? curruntRecord[2].trim() : '';
        csvArr.push(csvRecord);
    }
    return csvArr;
  }
}
class CSVRecord {
  id: string;
  name: string;
  salary: string;
}