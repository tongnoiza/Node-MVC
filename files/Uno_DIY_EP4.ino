#include <TM1637Display.h>
// Module connection pins (Digital Pins)
#define CLK 2
#define DIO 3

String comString = "";     // a String to hold incoming data
bool dataComReady = false;  // whether the string is complete
int counter=0;
int k;
uint8_t data[] = { 0x00, 0x00, 0x00, 0x00 };
byte node=1;

TM1637Display display(CLK, DIO);
 
void setup() {
  // reserve 128 bytes for the comString:
  comString.reserve(128);
  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN, LOW);
  Serial.begin(9600);
  dataComReady = false;
  //Serial.println("Uno DIY Ep.4");
  //Serial.println("Learning RS485");
  
  display.setBrightness(0x0f);
  data[0] = display.encodeDigit(node);
  data[1] = 0x40;
  display.setSegments(data);
}

void serialEvent() 
{
  while (Serial.available()>0) 
  {
    char inChar = (char)Serial.read(); // get the new byte: 
    comString += inChar;               // add it to the comString:
    if (inChar == '\n') 
     {
       comString.trim();
       dataComReady = true;
     }
  }
}

void loop() 
{
   // Job #1
   while(dataComReady==false)
   {
    digitalWrite(LED_BUILTIN, HIGH);
    delay2(500);
    digitalWrite(LED_BUILTIN, LOW);
    delay2(500);
    if(Serial.available()>0){ 
      //serialEvent();
      break;
     }
   }

   //Job #2
   if(dataComReady)
   {
     if(comString[0]=='!' and (comString[1]&0x0f)==node)
     {
      //Serial.println(comString);
      data[0] = display.encodeDigit(comString[1]);
      data[1] = 0x40;
      data[2] = display.encodeDigit(comString[3]);
      data[3] = display.encodeDigit(comString[4]);
      display.setSegments(data);
      //Serial.println("!2,65");
     }    
     comString="";
     dataComReady=false; 
   }  
} //Loop

//***=======================================

void delay2(int d){
  for (int i=0; i<=d; i++) {
    if(Serial.available()>0) { break; }
    else{
    delay(1);
    }
  }
}
