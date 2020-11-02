const express = require('express');
const path = require('path');
const redis = require('redis');
const cors = require('cors')
const favicon = require('serve-favicon');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const passport = require('passport');
const helmet = require('helmet');
const flash = require('connect-flash');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const logger = require('./lib/logger');
const authentication = require('./routes/authentication/index');
const helperPath = require('./views/helpers/index.js');

const admin = require('./routes/admin/index');
// const teacherInterview = require('./routes/teacherInterview/index');
const grade = require('./routes/grade/index');
const indexRouter = require('./routes/index');
const board = require('./routes/board/index');
const student = require('./routes/student/index');
const teacher = require('./routes/teacher/index');
const studentOnboarding = require('./routes/onboarding/student');
const teacherOnboarding = require('./routes/onboarding/teacher');
const role = require('./routes/role/index');
const swagger = require('./routes/swagger');
const courseModules = require('./routes/courseModules');
// const course = require('./routes/course');
const exam = require('./routes/exam');
const liveClass = require('./routes/liveClass/index');
const payment = require('./routes/payment/index');
// const notification = require('./routes/notification/index');
const chatbox = require('./routes/chatbox/index');
const discussionForum = require('./routes/discussionForum/index');
const test = require('./routes/test/index');
const documentUpload = require('./routes/courseModules/documentsUploads')
const batch = require('./routes/batch/index');
const testEvaluation = require('./routes/testEvaluation')
const feeStructure = require('./routes/feeStructure/index');
const paypal = require('./routes/payment/paypal');
const agora = require('./routes/agora/index');
const payu = require('./routes/payment/payu');


const app = express();
const corsConfig = {
  origin: true,
  credentials: true,
};

app.use(cors(corsConfig));
app.options('*', cors(corsConfig));
app.use((req, res, next) => {
  res.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=None");
  next();
});

/**
 * For Security Purpose using Helmet
 */
app.use(helmet());
app.use(helmet.noCache());
app.use(helmet.noSniff());
app.use(helmet.hidePoweredBy());
app.use(helmet.xssFilter());


/**
 * The Strict-Transport-Security HTTP header tells browsers to stick with HTTPS and never visit.
 * the insecure HTTP version.
 */
const sixtyDaysInSeconds = 5184000;
app.use(helmet.hsts({
  maxAge: sixtyDaysInSeconds,
}));

/**
 * view engine setup
 */
app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, '/views/layouts/'),
  partialsDir: path.join(__dirname, '/views/partials/'),
  helpers: helperPath,
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

/**
 *logger setup
 */
logger.init();
app.use(morgan('dev'));

/**
 * Redis Configuration
 */
app.use(session({
  secret: 'qwertyuiopasdfghjklzxcvbnm',
  key: 'sid',
  cookie: {
    secure: false,
    // maxAge: config.sessionTimeoutTime,
  },
  rolling: true,
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({
    client: redis.createClient(process.env.REDIS_URL),
  }),
}));

/**
 * Configuring Passport
 */
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(favicon(path.join(__dirname, 'public/images', 'favicon.png')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});

app.use('/', indexRouter);
app.use('/admin', admin);
// app.use('/teacherInterview', teacherInterview);
app.use('/api-docs', swagger);
app.use('/authentication', authentication);
app.use('/grade', grade);
app.use('/board', board);
app.use('/student', student);
app.use('/teacher', teacher);
app.use('/teacherOnboarding', teacherOnboarding);
app.use('/studentOnboarding', studentOnboarding);
app.use('/role', role);
// app.use('/course', course);
app.use('/courseModules', courseModules);
app.use('/exam', exam);
app.use('/liveClass', liveClass);
app.use('/payment', payment);
// app.use('/notification', notification);
app.use('/chatbox', chatbox);
app.use('/discussionForum', discussionForum);
app.use('/test', test);
app.use('/documentUpload', documentUpload);
app.use('/batch', batch);
app.use('/testEvaluation', testEvaluation);
app.use('/feeStructure', feeStructure);
app.use('/paypal', paypal);
app.use('/agora', agora);
app.use('/payu', payu);



app.get('/*', (req, res) => {
  res.status(400).json({ status: 400, message: 'Bad request' });
});

/**
 * catch 404 and forwarding to error handler
 */
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/**
 * error handlers
 * development error handler,will print stacktrace
 */
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

/**
 * production error handler,no stacktraces leaked to user
 */
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});


module.exports = app;
