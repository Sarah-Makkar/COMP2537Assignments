'use strict';

const express = require('express');
const app = express();
const fs = require("fs");
const bodyParser = require('body-parser');

const msg = 'Error';

app.use('/css', express.static('private/css'));
app.use('/js', express.static('private/js'));
app.use('/images', express.static('private/images'));


app.use(bodyParser.urlencoded({
    extended: false
}));


app.use(bodyParser.json());




const items = [{
        title: "We are all born free and equal",
        body: "Dignity is the foundation of all human rights. Human beings have rights, and should be treated with utmost care, precisely because each one possesses intrinsic worth. Former UN rights chief Zeid Ra’ad Al Hussein called these opening words “perhaps the most resonant and beautiful words of any international agreement.” They underline that “human rights are not a reward for good behavior,” as he put it, but the entitlement of all people at all times and in all places.",
        date: "28 April, 2021"
    },
    {
        title: "Freedom from Discrimination",
        body: "It states that everyone is entitled to all the freedoms listed in the UDHR, “without distinction of any kind such as race, colour, sex, language, religion, political or other opinion, national or social origin, property, birth or other status.” The last words of this sentence – “other status” – have frequently been cited to expand the list of people specifically protected.",
        date: "27 April, 2021"
    },
    {
        title: "Right to Life",
        body: "The first six words of this short article are at the heart of global attempts to end the death penalty. If it enshrines the right to life, abolitionists argue, how can state-sponsored killing be justified? As South African Anglican Bishop Desmond Tutu said, to take a life when a life has been lost is revenge, not justice. Drafters of the 1948 Universal Declaration of Human Rights (UDHR) had fresh in their minds Nazi concentration camps and state-organized slaughter of millions simply because they were not the “correct” sort of person. Article 3 – and closely related Articles 5 and 9 against torture and arbitrary arrest – were a firm renunciation of Hitler’s belief in the supremacy of the state to control the lives of individuals.",
        date: "26 April 2021"
    },
    {
        title: "Freedom from Slavery",
        body: "Men bought and sold like commodities, held for years against their will on fishing boats off Thailand. Yazidi women sold into sex slavery, raped daily and passed from owner to owner. Human beings offered as birthday gifts to children. Article 4 is clear: no one has the right to make us a slave and we cannot make anyone our slave. But if you thought slavery disappeared with the end of the Transatlantic slave trade in the 1800s, it may be a shock to learn of the abuse of fisherfolk who supply seafood to some of the world’s top supermarkets, the fate of women under so-called Islamic State or of migrant women in brothels in Europe and elsewhere; or current reality in Mauritania, the last country in the world to officially ban slavery",
        date: "25 April,2021"
    },
    {
        title: "Freedom from Torture",
        body: "There is one absolute prohibition in the Universal Declaration of Human Rights (UDHR) that is universally accepted as unequivocal: Article 5’s ban on torture. At times, states may have disputed the definition of what constitutes torture, but virtually none now openly defend the practice, even if some still carry it out in what the UN High Commissioner for Human Rights described as “some of the darkest corners of our planet.”The ban on torture is another reflection of the revulsion against Nazi concentration camps and Nazi medical experiments on living people that so motivated the drafters of the UDHR in the late 1940s. It is further elaborated in the 1984 UN Convention Against Torture, which makes the absolute nature of the prohibition of torture crystal clear: “No exceptional circumstances whatsoever, whether a state of war or a threat of war, internal political instability or any other public emergency, may be invoked as justification of torture.”",
        date: "24 April,2021"
    },
    {
        title: "Right to Recognition Before the Law",
        body: "After setting standards for dignity and freedom, the Universal Declaration of Human Rights (UDHR) devotes a cluster of articles to standards for the administration of justice including what is often known as “due process.” Roughly one-fourth of the UDHR is devoted to legal human rights. As we have already seen, in the late 1940s, the abuses of the Nazi regime were fresh in the mind of the UDHR’s drafters, who thought these provisions would entrench the strongest protection against future Nazi-type human rights violations. And indeed, by the late 1940s all of these provisions had been incorporated in the legal systems of developed nations.",
        date: "23 April,2021"
    },
    {
        title: "Right to Equality Before the Law",
        body: "At the end of the 19th century and beginning of the 20th century, women in many industrialized countries fought for the right to vote. “There never will be complete equality until women themselves help to make laws and elect lawmakers,” said U.S. suffragette Susan B. Anthony. More than a century on, the only country in the world where women cannot vote is Vatican City: there the right to cast ballots for a new Pope is restricted to cardinals, who are all men. But, as the UN High Commissioner for Human Rights pointed out in 2107, despite universal gains at the ballot box, “many women and girls continue to be routinely deprived of equal access to resources, denied choice, robbed of opportunities and constrained by false and humiliating stereotypes.”",
        date: "22 April,2021"
    },
    {
        title: "Right to Remedy",
        body: "The pledge of effective remedy for everyone, found in Article 8, is an intrinsic – if all too often neglected – part of the system of providing justice. “True peace is not merely the absence of war, it is the presence of justice,” said Jane Addams, the second woman to win the Nobel Peace Prize, said in 1931.After two World Wars, the drafters of the Universal Declaration of Human Rights (UDHR) considered it important to assert the principle of free treatment by fair courts – that all of us have an avenue for redress if our rights are violated.  “Societies based on justice and equal rights before the law are not just more fair – they are more cohesive,” said Zeid Ra’ad Al Hussein, former UN High Commissioner for Human Rights.  Economic evidence shows they are also more prosperous, he added. ",
        date: "21 April,2021"
    },
    {
        title: "Freedom from Arbitrary Detention",
        body: "Can you get locked up for being a poet? Yes, in the Soviet Union in 1964.  Joseph Brodsky, now considered one of Russia’s greatest poets, was hauled into court in Leningrad, accused of being “a pseudo-poet in velveteen trousers” – specifically a freeloader who contributed nothing to society. Soviet judges simply could not see the value of poetry. Despite having no actual mental illness, Brodsky was sent off for two stints in psychiatric prisons where he was effectively tortured – one of thousands to suffer such a fate in the Soviet Union.The abuse of psychiatry to keep dissenters in line is one of several violations covered under Article 9 of the Universal Declaration of Human Rights, which basically says no one can be put in prison and kept there without a good reason.  It applies not only to prisons, but also to an increasing number of places where people might be held without a fair trial or clear sentence: asylum detention centres, immigration facilities and drug treatment centres.",
        date: "20 April,2021"
    },
    {
        title: "Right to a Fair Trial",
        body: "The right to a fair trial is at the heart of Article 10, one more section of the 1948 Universal Declaration of Human Rights (UDHR) that aims to prevent a repetition of the atrocities of Hitler’s Germany, where compliant judges and courts served the aims of the Nazi regime, rather than the cause of justice in the interest of the people. Some guarantees of a fair trial, including the right to presumption of innocence, can also be found in Articles 6, 7, 8 and 11 of the Declaration. The right to a fair trial has been accepted beyond dispute by every country (even if they do not always honour it). Fair trials not only protect suspects and defendants, they make societies safer and stronger by solidifying confidence in justice and the rule of law",
        date: "19 April,2021"
    },
    {
        title: "Presumption of Innocence and International Crimes",
        body: "At first glance, Article 11 says that every human being is innocent until proven guilty, a fundamental element of fair trials and the rule of law, and a concept everyone can understand. But dig a little deeper into this Article, and we uncover a fascinating story about the development of international courts with the power to hold individuals accountable for the most heinous crimes known to humankind. Over the last 70 years, the world has come to accept that the world’s worst abusers of human rights should be held responsible for their crimes. They cannot evade prosecution because they were rulers of countries or military leaders. No one should be above the law.",
        date: "18 April,2021"
    },
    {
        title: "Right to Privacy",
        body: "Should schools use cameras in the classroom to monitor children’s faces and determine whether they are paying attention? Would you use free WiFi at a street kiosk if you knew its cameras and sensors were collecting data on you, and that you would continue to be tracked even after you left the WiFi zone? If you wear a fitness tracker on your wrist, how would you feel if an insurance company used its data to deny you coverage?These are not fragments of a dystopian nightmare, but very real issues of our digital age that could not have been foreseen in 1948 by the drafters of the Universal Declaration of Human Rights (UDHR). Yet the concept of privacy, enshrined in Article 12, has in fact become ever more central to all our lives over the last 70 years, with the increase in data collection by governments and business. Privacy is often asserted as a “gateway” right that reinforces other rights, online and offline, including the right to equality and non-discrimination, and freedom of expression and assembly.",
        date: "17 April,2021"
    },
    {
        title: "Freedom of Movement",
        body: "Article 13 of the Universal Declaration of Human Rights (UDHR) guarantees freedom of movement. You should be able to travel around your own country and choose where you live. This right is not absolute. Countries can limit the freedom of people on their territory, such as confining them to their village during an Ebola outbreak, or compel them to leave their homes if, for example, they are threatened by a typhoon or other natural disaster. But there has to be an overriding public interest: it’s unlawful for a dictator to expel people from their homes to build a golf course. And evacuation of civilians during a war cannot be cover for ethnic cleansing.",
        date: "16 April,2021"
    },
    {
        title: "Right to Asylum",
        body: "Article 14 of the UDHR grants the right to seek and enjoy asylum from persecution. This right, in addition to the right to leave one’s own country (Article 13), and the right to nationality (Article 15), can be traced directly to events of the Holocaust. Many countries whose drafters worked on the UDHR were acutely aware that they had turned away Jewish refugees, likely condemning them to death. In addition, many Jews, Roma and others hunted by the Nazis had been unable to leave Germany to save their lives.Under the umbrella of Article 14, more fully articulated in the 1951 Refugee Convention, over the decades millions of people have been given life-saving protection as refugees, been able to rebuild their lives and often have gone home again once the danger has passed. Many have also been resettled in generous third countries, where they use their skills to contribute to their new homelands. And some can settle permanently in the countries where they found refuge, like more than 170,000 Burundians who fled the country in 1972 and received Tanzanian citizenship in what is believed to be the world’s biggest naturalization of refugees.",
        date: "15 April,2021"
    },
    {
        title: "Right to Nationality",
        body: "Most of the people on this planet take for granted the right to nationality guaranteed by Article 15 of the Universal Declaration of Human Rights (UDHR). Most of us can acquire an ID card, passport or other documents without any problem. But around the world some 3.9 million people are officially without nationality, and the UN Refugee Agency estimates the true figure could be three times higher. The Universal Declaration asserts that all human beings are born with the inherent rights it sets out. For this reason, many dislike Hannah Arendt’s formulation that nationality is the “right to have rights.” But without nationality, it is practically impossible to exercise many other rights – to go to school, get medical treatment, get a job legally, report a crime, travel across borders and, as the Vietnamese man lamented, even for your family to get a death certificate when you go.",
        date: "14 April,2021"
    },
    {
        title: "Right to Marry and to Found a Family",
        body: "Article 16 delves into the intimate lives of humans. It says every adult has the right to marry and have a family if they want to. Women and men also have the same rights during their marriages, and if they divorce. In addition, for the only time in this document, it explicitly invokes the duty of the State to provide protection, underscoring the high regard the drafters had for the family.'Denying people access to marriage …it’s denying them the status and dignity of being ordinary citizens in society. ",
        date: "13 April,2021"
    },
    {
        title: "Right to Own Property",
        body: "Article 17 of the Universal Declaration of Human Rights (UDHR) guarantees the right to property. This is yet another right included in reaction to the atrocities of the Holocaust, when property was confiscated from Jews and others, often to enrich Nazi officials. European Jews were stripped of billions of dollars’ worth of cash, artwork, houses, businesses and personal belongings. “Hitler’s Final Solution was not only an act of genocide: it was also a campaign of organised theft,” says one writer. Despite this motivation, as the UDHR was being drafted between 1946 and 1948, the world was dividing into the ideological camps of the Cold War, with democratic and capitalist countries on one side and non-democratic socialist states on the other.",
        date: "12 April,2021"
    },
    {
        title: "Freedom of Religion or Belief",
        body: "Article 18 of the Universal Declaration of Human Rights (UDHR) says we all have the right to our own beliefs, to have a religion, have no religion, or to change it. For its time, the UDHR was very progressive in asserting that believers of all religions and secular beliefs should be able to live peacefully with their rights guaranteed by the State, while not presuming any national or state-sponsored religion. 'The obligation of the state is to guarantee freedom of religion, and that implies dealing with all of them on an equal footing.'–Former Cuban foreign minister Ricardo Alarcón Article 18 protects theistic, non-theistic and atheistic believers as well as those who do not profess any religion or belief. Less well known is the role that religious organisations played in launching and sustaining the human rights movement. In South Asia, Hinduism inspired Mahatma Gandhi’s long march for the liberation of India. Protestant Christians led the fight to abolish slavery in the UK and US in the 19th century. Roman Catholics in Poland and Lutherans in East Germany were at the vanguard of fighting authoritarianism at the end of the 20th century, and Roman Catholics in Latin America pressed for social justice with their “liberation theology.",
        date: "11 April,2021"
    },
    {
        title: "Freedom of Opinion and Expression",
        body: "Article 19 includes the right to “seek, receive and impart information and ideas through any media and regardless of frontiers.” Although individuals enjoy the same rights online as offline, states are also censoring, and sometimes criminalizing, a wide range of online content via vague or ambiguous laws prohibiting “extremism,” “blasphemy”, “defamation”, “offensive” language, “false news” and “propaganda”.As efforts to control speech and information increase, the UN Human Rights Office has provided guidance on how to distinguish free speech from hate speech through the Rabat Plan of Action, which suggests setting a high threshold for interpreting the restrictions set by international human rights law in restricting freedom of expression. Its six-part threshold test takes into account the context, intent, content, extent, speaker’s status, and likelihood that the speech in question would incite action against the target group, and is being used in Tunisia, Côte d’Ivoire and Morocco, and by the European Court of Human Rights in a recent judgment on the Pussy Riot case.",
        date: "10 April,2021"
    },
    {
        title: "Freedom of Assembly and Association",
        body: "The former UN Special Rapporteur on the rights to peaceful assembly and association, Maina Kiai, pointed out that “Participating in peaceful protests is an alternative to violence and armed force, as a means of expression and change, which we should support. It must thus be protected, and protected robustly.” Article 20 also gives us the right to form or join a group – and protects us from being compelled to join an association. Associations include trade unions, clubs, religious associations, political parties – and, increasingly today, online groups. Social media has played a vital role in helping human rights defenders and communities to organize, voice their concerns and respond to threats. Technological innovation has also greatly helped them document human rights violations, and carry out remote monitoring and swift reporting. But on the dark side, video and on-line surveillance, on-line censorship and harassment, and incitement to violence via social media platforms also endanger associations, and their individual members, in a variety of ways.",
        date: "9 April,2021"
    },
    {
        title: "A Short Course in Democracy",
        body: "In three concise paragraphs, Article 21 of the Universal Declaration of Human Rights (UDHR) outlines some of the fundamental principles of democracy: the will of the people should be the basis of government authority, and everyone has the right to take part in the government “directly or through freely chosen representatives.” It calls for periodic, genuine elections with universal suffrage and secret ballot, and also establishes that “everyone has the right to equal access to public service.”It does not actually include the word “democracy” – which does not appear anywhere in the UDHR, apart from one reference, in Article 29, to “democratic society.”  Just three years after the end of World War II, the term “democracy” was already snared up in the rapidly developing Cold War ideological disputes, with the Soviet bloc and Western countries interpreting the term quite differently.",
        date: "9 April,2021"
    },
    {
        title: "Right to Social Security",
        body: "Article 22 spells out the qualities of the modern welfare state that are almost universally accepted today. According to the International Labour Organization (ILO), in 1900, only 17 countries had social protection systems to support individuals and families through pensions for the elderly, disability payments for injured workers, benefits for mothers, health insurance and many other programs. Social assistance can include cash transfers, and is often referred to as a “social safety net” that helps people, especially the poor and vulnerable, cope with life’s shocks, find jobs and educate their children. According to ILO, the number of countries with social protection systems had increased to 104 by 1946 and 187 by 2015. Around the world, about 45% of people had access to at least one social protection benefit in 2017, while 29% had access to comprehensive social security systems. ",
        date: "8 April,2021"
    },
    {
        title: "Right to Work",
        body: "Article 23 spelled out, in four paragraphs, the right of “everyone” to work, with equal pay for equal work, and without discrimination. The right to form and join trade unions is also clearly enunciated. “I belong to the generation of workers who, born in the villages and hamlets of rural Poland, had the opportunity to acquire education and find employment in industry, becoming… conscious of their rights and importance in society.” –Lech Walesa, head of the Solidarity trade union and subsequently President of Poland. In its third paragraph, Article 23 calls for “just and favourable remuneration” to ensure “an existence worthy of human dignity” for workers and their families, reflecting again a vision of a better world than the just-defeated Nazi Germany with its slave labour.",
        date: "7 April,2021"
    },
    {
        title: "Right to Rest and Leisure",
        body: "In 19 crisp words, Article 24 of the Universal Declaration of Human Rights presents the flip side of the right to work articulated in Article 23 – the right not to be over-worked. It enshrines the right to limited working hours and paid holidays, but as Cuban drafter Pérez Cisneros said in the late 1940s, it should not be interpreted as 'the right to laziness.' Article 24: Everyone has the right to rest and leisure, including reasonable limitation of working hours and periodic holidays with pay.",
        date: "6 April,2021"
    },
    {
        title: "Right to Adequate Standard of Living",
        body: "Article 25 of the Universal Declaration of Human Rights covers a wide range of rights, including those to adequate food, water, sanitation, clothing, housing and medical care, as well as social protection covering situations beyond one’s control, such as disability, widowhood, unemployment and old age. Mothers and children are singled out for special care. This Article is an effort to secure freedom from want, based on U.S. President Franklin Roosevelt’s famous vision of four freedoms. In a speech in 1941, he looked forward to a world founded upon four essential human freedoms: the freedom of speech and expression, the freedom to worship God in his own way, freedom from want and freedom from fear. After Roosevelt’s death and the end of World War II, his widow Eleanor often referred to the four freedoms as head of the committee drafting the UDHR.",
        date: "5 April,2021"
    },
    {
        title: "Right to Education",
        body: "Article 26 of the Universal Declaration of Human Rights (UDHR) makes universal free primary education compulsory, and is usually thought of as a right about children. But as Maruge showed, people of any age can seek and benefit from education and literacy. Not only was a movie made about his life, but his story inspired many dropouts in Kenya to return to school and complete their education. This right is further enshrined in various international conventions, in particular the International Covenant on Economic, Social and Cultural Rights and the Convention on the Rights of the Child (which has been ratified by every country except the United States). In Article 26 of the UDHR, we see the right to 'full development of the human personality,' which also appears in Articles 22 and 29. It is clear the drafters saw this term as a way of summarizing many of the social, economic and cultural rights in the Declaration, and there has been an increasing focus by international bodies on the role of education in empowering individuals – both children and adults.",
        date: "4 April,2021"
    },
    {
        title: "Right to Cultural, Artistic and Scientific Life",
        body: "Article 27 says everyone has the right to freely participate in the cultural life of the community, to share scientific advances and its benefits, and to get credit for their own work. This article firmly incorporates cultural rights as human rights for all. They relate to the pursuit of knowledge and understanding, and to creative responses to a constantly changing world. A prerequisite for implementing Article 27 is ensuring the necessary conditions for everyone to continuously engage in critical thinking, and to have the opportunity to interrogate, investigate and contribute ideas, regardless of frontiers.",
        date: "3 April,2021"
    },
    {
        title: "Right to a Free and Fair World",
        body: "The Universal Declaration of Human Rights was drafted in a period, 1946-1948, that was simultaneously filled with optimism, yet overshadowed by the preceding thirty years of disaster – the Great Depression and two world wars. In the view of the drafters of the UDHR, a world at peace was essential for respect for human rights and to create opportunities for everyone to improve their lives. Article 28 says, in its entirety, that everyone is entitled to a social and international order in which the rights and freedoms set forth in this Declaration can be fully realized.",
        date: "2 April,2021"
    },
    {
        title: "Duty to Your Community",
        body: "So far, the Universal Declaration of Human Rights (UDHR) has concentrated on rights that every person has simply by virtue of being born human. Now Article 29 says the corollary of rights is duties. We all have a duty to other people, and we should protect their rights and freedoms. Fernand Dehousse, the Belgian representative to the United Nations while the UDHR was being drafted, said that Article 29’s first paragraph quite properly established a sort of contract between the individual and community, involving a fair exchange of benefits. Article 29 also says rights are not unlimited. If they were, social balance and harmony would be impossible. It seeks to link the exercise of rights with the interests of the world community, which the United Nations had been set up in 1945 to represent.",
        date: "1 April,20211"
    },
    {
        title: "Rights are Inalienable",
        body: "Article 30 has been called 'limits on tyrants.' It gives all of us freedom from State or personal interference in the rights in all the preceding Articles. However, it also stresses that we may not exercise these rights in contravention of the purposes of the United Nations. Working in the shadow of the Second World War, the drafters wanted to prevent Fascists’ returning to power in Germany by, for example, taking advantage of  freedom of expression and freedom to stand for election at the expense of other rights and freedoms. They were acutely aware that many of the atrocities inflicted by Hitler’s regime were based on an efficient legal system – but with laws that violated basic human rights.",
        date: "31 March,2021"
    }
]

class Item {
    constructor(title, body, date) {
        this.title = title;
        this.body = body;
        this.date = date;
    }

    get getTitle() {
        return this.title;
    }

    get getBody() {
        return this.body;
    }

    get getDate() {
        return this.date;
    }

    set setTitle(title) {
        this.title = title;
    }


    set setBody(body) {
        this.body = body;
    }

    set setDate(date) {
        this.date = date;
    }

    toString() {
        let result = this.title + "\n" + this.body +
            "\n" + this.date;
        return result;
    }
}


app.get('/', function (req, res) {


    res.set('Server', 'Newsfeed');

    fs.readFile("./private/html/index.html", function (error, data) {
        if (error) {
            res.writeHead(404);
            res.write(msg);
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(data);
        }

        res.end();
    });

});

app.get('/newsfeed-update', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let random = Math.floor(Math.random() * 30);
    let object = new Item(items[random].title, items[random].body, items[random].date);

    console.log(JSON.stringify(object));
    res.send(JSON.stringify(object));
});

let port = 3030;
app.listen(port, function () {
    console.log('App listening on port ' + port + '!');
});