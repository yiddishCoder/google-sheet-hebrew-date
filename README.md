# google sheet hebrew date converter

use this as a script in google sheets to convert a gregorian date to a hebrew date

## Getting Started

open the sheet where you want to use this function go to tools > script editer
delete the current text and paste the text of heb_date.gs  
**save the file**

## how to use
enter the function HEB_DATE and give the first argument as a date and add more arguments for whatever you want to return  
  
this script can return any of the following  
"day" returns the day of the week as a single hebrew letter  
"parsha" returns the parsha of the week  
"date" returns the date in the hebrew month  
"month" returns the hebrew month  
"year" returns the hebrew year   
"yearAbbr" returns the last or last two letters of the hebrew year (like פ' or פ"א)  
any symbol or character you want to be added to return  

## sample
=HEB_DATE(DATE(2021,9,16),"date","month","-","yearAbbr") will return "י׳ תשרי - פ״ב "
  
=HEB_DATE(TODAY(),"day","parsha")
