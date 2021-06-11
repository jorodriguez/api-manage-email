

class EmailData {

    constructor() {
        this.from;
        this.to;
        this.cc;
        this.cco;
        this.subject;
        this.html;
    }

    setFrom(from = '') {
        this.from = from;
        return this;
    }

    setTo(to = '') {
        this.to = to;
        return this;
    }

    setCc(cc = '') {
        this.cc = cc;
        return this;
    }

    setCco(cco = '') {
        this.cco = cco;
        return this;
    }

    setSubject(subject = '') {
        this.subject = subject;
        return this;
    }

    setHtml(html = '') {
        this.html = html;
        return this;
    }

    build() {
        return {
            from : this.from,
            to : this.to,
            cc : this.cc,
            cco : this.cco,
            subject : this.subject,
            html : this.html
        }
    }
}

module.exports = EmailData;


