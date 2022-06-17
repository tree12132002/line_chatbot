# Restaurant-helper_linebot
* It provides users to set the server and add friends through the QR code below, then you can use the function with Line.

## Feature
* Users can add friends thoungh QR code below.
* Users can press `最新消息` to get the latest information.
* Users can press `店面位置` to get the location of the store.
* Users can press `線上訂位` to get the phone number of the store. 
* Users can press `外帶預約` to get some dishes and press `Add to cart` to put it in the cart. Next, users can press `購物車查詢` to check the cart, press `重新下單` to clean the cart or press `確認下單` to make the order. After making an order, users can press `訂單查詢` to get the latest orderlist.
* Users can press `菜單` to get the picture of the menu.
* Userc can press `營業時間` to get the opening time of the store.

## How to start
* Open the website with Heroku to set the server
```bash
https://protected-crag-40616.herokuapp.com/
```
* Add friends through QR code below

![image](https://github.com/tree12132002/line_chatbot/blob/main/072qfwfz.png)

## Another way to use it
* Clone the project
```bash
git clone https://github.com/tree12132002/line_chatbot
```
* Move current directory to the project
```bash
cd *path to the file*/line_chatbot
```
* Install NPM packages
```bash
npm install
```
* Database migration(be sure that you've already installed a MySQL database)
```bash
npx sequelize db:migrate:all
```
* Start the app server
```bash
npm run dev
```
* Use ngrok to host your local server on the Internet
* Create an account of LINE Developers and Messaging API
* Start ngrok server
```bash
./ngrok http 3000
```
* Edit the Webhook settings and press `Verify`
* End the server
```bash
ctrl + c
```
