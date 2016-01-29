curl -s --user 'api:key-def1ef87628689cc4994f262c244afbe' \
    https://api.mailgun.net/v3/sandboxc6071d29be3c4afcbc730683e8ddb72a.mailgun.org/messages \
    -F from='Mailgun Sandbox <postmaster@sandboxc6071d29be3c4afcbc730683e8ddb72a.mailgun.org>' \
    -F to='Erik van Zummeren <e.van.zummeren@vpro.nl>'\
    -F subject='Hello Erik van Zummeren' \
    -F text='Bladiebladiebla' \