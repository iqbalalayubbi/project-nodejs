const mongoose = require('mongoose');
// mongo local
mongoose.connect('mongodb://127.0.0.1:27017/app');
// mongo atlas
// mongoose.connect('mongodb+srv://iqbal:MdbiYsms7jN5TdVu@cluster0.qofpz.mongodb.net/app?retryWrites=true&w=majority');