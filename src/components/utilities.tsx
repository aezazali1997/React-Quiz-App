export const shuffleArray = (array:string[]) => {
 let swaper,swaper2;
 for (let index = 0; index < array.length; index++) {
   swaper = array[index];
   swaper2=Math.floor(Math.random()*array.length);
   array[index]=array[swaper2];
   array[swaper2]=swaper;
 }
 return array;
}