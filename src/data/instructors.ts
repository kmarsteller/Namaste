export interface Instructor {
  name: string;
  photo: string;
  certs: string[];
  bio?: string;
  owner?: boolean;
  arketaId?: string; // host= param from Arketa instructor URL
}

export const instructors: Instructor[] = [
  {
    name: "Jolynn McFerren",
    photo: "/instructors/cropped-Jolynn.jpg",
    certs: ["RYT 500", "YACEP", "2× 200-hr", "300-hr", "Thai Yoga Massage"],
    bio: "After practicing yoga for over 20 years, Jolynn found Namaste Yoga Studio and knew that it was the right time in her life to become a teacher of the practice. Jolynn and husband, Brent, have been the owners of Namaste Yoga since 2011 and they also have three children to keep them occupied!\n\nJolynn's 200-hour certifications are through Namaste Yoga with Mary Pat Murphy & Rowan Silverberg, Anusara Yoga through Todd Norian & Ann Greene, and a 300-hour certification, also through Namaste Yoga Studio. She has studied with a variety of teachers across the country including Tara Glazier, Tiffany Cruikshank, Seane Corne, Kathryn Budig, Noah Maze, Jason Crandell, Desiree Rumbaugh, Karen Church, Doug Keller and many more.\n\nJolynn sees the value in yoga at any age and teaches a wide variety of styles and levels of yoga for adults and kids. One of her favorite quotes is Mother Teresa's \"Do small things with great love.\" Giving back to others and her community is one of Jolynn's passions in life and through Namaste Yoga, she is able to do just that.",
    owner: true,
    arketaId: "EWZS8eT7DAae4I3WfWmr6MwdkG63",
  },
  {
    name: "Amanda Abounader",
    photo: "/instructors/cropped-1000013397-scaled-1.jpg",
    certs: ["200-hr"],
    bio: "In 2014, I took a leap of faith and tried my first yoga class. I instantly fell in love (even though I had no idea what I was doing) and I have been practicing ever since. I just want to share my love for yoga with everyone, so I finally decided to become a certified yoga instructor, completing my 200 hour teacher training in May 2025.\n\nMy favorite pose is half-moon. It makes me feel strong and powerful, as well as free and open, like I can accomplish anything!",
    arketaId: "FZtJg8dIkHNh1qmTOWbaZ7wAZq33",
  },
  {
    name: "Bianca Blois",
    photo: "/instructors/cropped-Bianca.jpg",
    certs: ["200-hr"],
    bio: "Bianca Blois began practicing yoga in 2015 as a way to incorporate more exercise into her busy college schedule. Bianca found that yoga not only provided her with physical benefits, but spiritual and emotional benefits as well.\n\nSince discovering yoga in 2015, Bianca has explored various styles of yoga, such as power, vinyasa, yin, and restorative. Bianca received her 200-hour Yoga Teacher Certification in 2021 from Namaste Yoga Studio, where she studied under Jolynn McFerren, Anvia Sheldon, and Ruth Zito.",
    arketaId: "BTf7WRkDlyeQR3KSyRjRcgXaux13",
  },
  {
    name: "Meg Crawford",
    photo: "/instructors/cropped-Meg.jpg",
    certs: ["200-hr"],
    bio: "Meg Crawford began her yoga practice 5 years ago to try something new. It is now a daily practice that has shaped her personality. She was able to find stillness in her mind the first time she was on the mat.\n\nMeg completed her 200-hour Teacher Training at Namaste Yoga Studio in 2022 to further explore yoga. Meg excels in yin and restorative yoga by shaping practices around themes that relate closely to her students. She teaches creative sequences that provide students with relaxation and mindfulness.\n\nMeg wants to provide students with a safe space where they can leave all their worries on their mat and work to better themselves.",
    arketaId: "0obeIWG6YdhLy2N2jlW0Xw1iPY13",
  },
  {
    name: "Melissa Crouse",
    photo: "/instructors/cropped-Melissa.jpg",
    certs: ["200-hr", "Thai Yoga Massage"],
    bio: "Melissa began taking regular yoga classes in 2011. After the first class, she was hooked. While she primarily attended all levels and power classes, she found yoga provided a calm to her mind/body that no other exercise had been able to do.\n\nIn 2015, Melissa moved to Ohio and found Namaste. She instantly felt at home and has been practicing at the studio ever since. She is a 2022 graduate of the Namaste 200 hour teacher training program studying under Jolynn McFerren and Cyndy Edwards.\n\nAs a physical therapist, Melissa believes caring for your body and mind using proper alignment, breath work, and functional movement is key to healthy aging. She creates thoughtful flows to strengthen the physical body and calm the nervous system.",
    arketaId: "4CqICp8dUMOTrNPhpGfN2t55DJv1",
  },
  {
    name: "Cyndy Edwards",
    photo: "/instructors/cropped-cropped-Cyndy.jpg",
    certs: ["RYT 500", "YACEP", "Yoga for Healthy Aging"],
    bio: "Cyndy Edwards combines her years of experience in special education with her yoga training as she teaches. She is a 500hr Yoga Medicine Therapeutic Specialist, Yoga Alliance E-RYT500 & Continuing Education Provider (YACEP). Drawn to the more introspective aspects of yoga, she has built a range of knowledge through continued study among which include certificates in yoga anatomy, pranayama, meditation, yoga nidra, & mindful yin.\n\nRecognizing the interconnectedness of mind & body, Cyndy's classes begin with body awareness & aim to build & expand students' & colleagues' capacity for openness, balance, & clarity within each moment on & off the mat.",
    arketaId: "q9oRVgPJyNbrOiDusqkmJWXilVu1",
  },
  {
    name: "Michele Egleston",
    photo: "/instructors/cropped-Michele.jpg",
    certs: ["200-hr", "Thai Yoga Massage"],
    bio: "Everyone comes to their mat for their own reasons. Admittedly, I started practicing yoga for the physical benefits. At some point, my practice changed from me in a room full of sweaty people to me in a room full of sweaty people that I no longer noticed. It really became a practice of me, my mat and my breath. Everything else kind of disappeared. And THAT is amazing and empowering. A true moving meditation.\n\nWhile I still enjoy the occasional hot, sweaty practice, I love teaching to people just like me — busy people just looking for a way to tune out their busy lives by connecting with themselves.\n\nOver the years, I've been lucky enough to study with some really awesome \"rockstar\" teachers — Doug Keller, Desiree Rumbaugh, Todd Norian, Rodney Yee — but the teacher who inspired me all the way to becoming a yoga teacher myself is my dear friend, Mary Stepanek.",
    arketaId: "B1vRiawGhlQ5sYVqngzyLvkMXvy1",
  },
  {
    name: "Pam Foley",
    photo: "/instructors/cropped-Pam.jpg",
    certs: ["200-hr"],
    bio: "I have been practicing yoga sporadically over the past 20+ years. In 2021, I made the decision to take yoga teacher training for my mental health. I was feeling lost, depressed, stressed, and my anxiety was getting the best of me. I was working as an IT Supervisor and raising two young children with my husband, and desperately trying to figure out how to balance it all.\n\nI graduated YTT in June 2022, and decided to take a break from work to focus on myself and my family. I teach because it scares me a little bit, and because challenging and growing ourselves is what life is all about.\n\nMy classes are inspired by various writings and even podcasts that speak to me at the time and what I'm going through. My hope is that I can help others like me, or inspire those that just need some time for themselves on the mat.",
    arketaId: "P1HdwsFHsahjulxE5lrnSFqy76J3",
  },
  {
    name: "Lori Gray",
    photo: "/instructors/cropped-IMG_0600A.jpg",
    certs: ["200-hr", "Yoga Nidra", "200-hr Yoga Faith"],
    bio: "\"Turn off your mind, relax, and float downstream.\" — John Lennon\n\nLori first discovered yoga and meditation in Sr. Donna's high school Prayer class. Decades later, movement, stillness and prayer remain the center of her life. She completed Namaste's 200-hour teacher training in 2020, and recently finished her certifications in Yoga Nidra and 200-hour YogaFaith YTT. Currently, Lori is working toward certifications in Yin, Chair and Restorative Yoga.\n\nWhile her classes focus on gentle yoga and meditation practices, it's never boring! She often uses upbeat music from the 60s and 70s to inspire positivity and fun. Her other interests include piano, writing, gardening, and just about anything that brings creativity, love and light into the world.",
    arketaId: "WnsMciqSUQMf4gnpXMAOupBxZnl2",
  },
  {
    name: "Renee Hill",
    photo: "/instructors/cropped-Renee.png",
    certs: ["200-hr", "Yin Yoga", "Mat Pilates AAAI", "Vibrational Sound"],
    bio: "I am a retired educator with a M.Ed.; Yoga Alliance ERYT 200 instructor in all areas of yoga, including Yin yoga with Kari Kwinn/Bernie Clark. I am certified in Mat Pilates AAAI and a certified vibrational sound practitioner with Vibrational Sound Association.\n\nI am a mother of three daughters, a wife, grandmother, outdoor enthusiast, traveler, and dog mother. My yoga journey stems from the love of movement, cycling, hiking, skiing, and paddle boarding. I discovered that practicing yoga complemented my mind and body while participating in all these activities. I felt a stronger sense of stability, balance, and ease in my life.\n\nI received my RYT 200 from Yogafit in 2010 (which took about three years) while working full time as an elementary teacher, raising 3 active daughters, 2 dogs, and teaching Cycle classes. I am blessed to have my husband at my side supporting me through all the adventures I participated in, such as the women's cycle team and numerous yoga training sessions.\n\nI am a forever student always craving to learn more to be a better instructor so that I may continue to help others.",
    arketaId: "r4hbPph0iWftIxy6UahisyHOWhp1",
  },
  {
    name: "Kathy House",
    photo: "/instructors/cropped-Kathy.jpg",
    certs: ["200-hr"],
    bio: "Kathy House is an Advanced Yoga Teacher. She began her 200 hour Teacher Training at Namaste Yoga Studio and completed the program in June 2011. In September 2012, she attended Yoga Therapy Fundamentals Seminar taught by Doug Keller ERYT 500.\n\nKathy was employed as a Senior Social Worker at Louis Stokes VA Medical Center and taught Yoga to both Veterans and Federal Workers from October 2012 to October 2019. Her focus was stress reduction for our Veterans with Amputations and Spinal Cord Injuries. She continued her education with Doug Keller ERYT 500 in March 2013 (Neck & Shoulder Health), September 2015 (Movement Syndromes and Yoga Nidra), and September 2016 (Sciatic and Sacral Pain, Hamstrings, Knees, and Shoulders).\n\nIn March 2017, she attended the Veterans Yoga Project for Mindful Resilience. In September 2018, Todd Norian from Kripalu taught many Yoga Teachers Tantra Yoga Immersion and \"The Path of Radical Affirmation.\"\n\nKathy continues to teach at Namaste Yoga Studio both Slow Deep Stretch and Restorative Yoga using Chakras to identify our Power Centers.",
    arketaId: "Gg1ZR3hlyAgBgDEUxbU7k5ZrguH2",
  },
  {
    name: "Kris Kearns",
    photo: "/instructors/cropped-Kris.jpg",
    certs: ["200-hr", "300-hr"],
    bio: "Kris has always been active; soccer, horseback riding, cycling, weight lifting, scuba diving and swimming are just a few of the sports she loves, but after a severe knee injury she found herself unable to participate in many of these activities. This event led to a search for an exercise that was mindful but still challenging. Yoga and Aqua fitness filled the bill.\n\nAfter spending time rehabilitating her injury, she began to focus on these new passions. Realizing others may benefit from non-impact exercise programs, Kris began to pursue training in Yoga and Aqua Fitness. \"I believe that yoga in any form is beneficial to all and strive to make my classes accessible to all who wish to participate.\"\n\nShe has an RYT200 certification from Namaste Yoga Studio with Mary Pat Murphy and Rowan Silverberg, and has completed her RYT300-hour teacher training program with Mary Pat Murphy, Jolynn McFerren and Ruth Zito. Kris currently teaches Chair Yoga and Yin Yoga at Namaste.\n\n\"I enjoy teaching Yin yoga — this quiet practice allows the students to explore their edges and delve deeply into their meditation. It helps to balance and restore the body by resetting the nervous system. This type of practice is missing from our every day hustle and bustle.\"",
    arketaId: "3KmX9ENtLagEqcMdXJFlj4WgTyi2",
  },
  {
    name: "Lexi McDonald",
    photo: "/instructors/cropped-IMG_6020-scaled-1.jpg",
    certs: ["200-hr"],
    bio: "I began my yoga practice in 2018, and my mat has been a place I return to through every transition in my life. Yoga has allowed me to explore and challenge myself, eventually leading me to become a certified yoga instructor through Namaste Yoga Studio.\n\nI am passionate about yoga philosophy and hope to share my experience with any community I join, especially those that are underserved. I believe everyone can practice yoga and discover pieces within it that help make them whole.\n\nIn my teaching, I focus on presence over perfection and as a music enthusiast, I incorporate music from all over the world. I have a lifelong journey of learning, and I hope to understand more with every class I teach and every student I meet!",
    arketaId: "jySccrEaIqXi9uqGnioIBBauHKa2",
  },
  {
    name: "Kris Putz",
    photo: "/instructors/cropped-KrisPutz-scaled-1.jpg",
    certs: ["200-hr"],
    bio: "I first practiced yoga as a teenager after finding a guide to hatha yoga on the bookshelf at home. I let it go for some time while pursuing other activities like dance, roller blading, ice skating, hiking, cycling and swimming, but when I finally came back to it, I enjoyed how yoga is calming and centering on and off the mat.\n\nI returned to the practice in 2006 when Namaste Yoga Studio was located in Richfield and followed the studio's moves over the years. I have taken classes from many of the amazing teachers at Namaste and completed RYT 200-hour yoga teacher training at the studio in June 2025.\n\nI hope my students feel safe, supported and uplifted in their own yoga practice. I am grateful to be able to share my love of yoga in this welcoming Namaste community.",
    arketaId: "MGIM40PAHObiiLOcBD86ct4ttbC3",
  },
  {
    name: "Ceca Sarkissian",
    photo: "/instructors/cropped-Ceca-2.jpg",
    certs: ["200-hr"],
    bio: "Yoga has been a part of my life for over 18 years. My practice has helped me grow stronger, more flexible and courageous, both on and off the mat. I completed my 200 hour training with Namaste Yoga Studio in 2019. I am grateful for all of the teachers and students that have crossed my path and helped me to continue on this journey. I will always be a student of the practice and life.\n\nMy classes incorporate the balance between strength and flexibility; effort and ease. My hope is for each student to have a great experience on their mat so they can bring their yoga practice into their everyday life.\n\nFavorite Pose: Natarajasana — Dancer\nDancer's pose is one of my favorites. The balance along with the strength and softness you need to come into this pose embodies what yoga means to me.",
    arketaId: "aE1pAAdwzrNGoFuCeuy3C3ATUeA2",
  },
  {
    name: "Wendy Sinito",
    photo: "/instructors/cropped-Wendy.jpg",
    certs: ["200-hr", "Therapeutic Yoga I & II", "Thai Yoga Massage"],
    bio: "Wendy Sinito took her first Hatha yoga class in 1992 at the age of 17. Although she practiced yoga periodically over the years, she developed a consistent practice in 2019 to manage stress, to balance her competitive nature, and to reduce back pain related to her work as an Occupational Therapist.\n\nYoga's meaning in her life has changed significantly over the years. It has evolved from a fitness focus to a much deeper, multidimensional practice that goes way beyond the physical benefits. For Wendy, yoga is self-care, and she is honored to be able to share its many benefits with others.\n\nWendy was certified in Therapeutic Yoga Levels I and II for healthcare professionals in April 2021. In May 2023, she earned her RYT 200 certification through Namaste Yoga Studio with Jolynn McFerren and Cyndy Edwards. Wendy is grateful for the opportunity to study with inspirational teachers including Jolynn McFerren, Cyndy Edwards, and Ceca Sarkissian at Namaste, and with Cheri Clampett and Arturo Peale, co-founders of the Therapeutic Yoga Training Program.\n\nIn addition to her yoga training, Wendy brings 18 years of clinical experience as an Occupational Therapist to the mat with a focus on proper body alignment, joint protection, and modifications to maximize safety and to make yoga accessible and enjoyable for all.",
    arketaId: "aiRf8vynmCaHCIuuQ976FanrjxN2",
  },
  {
    name: "Angie Stempie",
    photo: "/instructors/cropped-AngieStempie-scaled-1.jpg",
    certs: ["200-hr"],
    bio: "The beginning of my yoga journey started in a private home studio with Jane Ruddy eRYT 500. The classes were small with just a few students per class or even just one, me. I then decided to expand my practice into hot powerful flows at a packed studio with mats lined up wall to wall. When I moved here to the local area 4 years ago I found Namaste and was able to call it hOMe. I enjoyed the friendly faces and family-like feel.\n\nEntering the YTT program here in 2024, I felt my practice grow physically and spiritually. Under the studies of Jolynn McFerren, Cyndy Edwards, and Melissa Crouse, I found a new way of viewing yoga and also my teaching voice! I am currently practicing and teaching all levels and slow flow yoga with aspects of meditation and sound bath experiences. I also regularly practice energy movements such as Tai Chi and Chi Gong and am a certified Reiki Master.\n\nAs a small business owner of Shear Desire Salon and Beyond for 16 years, I enjoy returning to my mat for stress relief, self care, and exercise; coming out of daily life thoughts and tasks and finding my center again. Is it time to find your center? What brings you to your mat today?",
    arketaId: "IE8k7xhrPlS86F7eamsJnl6gpz22",
  },
  {
    name: "Mary Stepanek",
    photo: "/instructors/cropped-Mary.jpg",
    certs: ["200-hr"],
    bio: "I began teaching in 2008 after completing my 200 hour certification at Namaste Yoga Studio, with Mary Pat Murphy and Rowan Silverberg. Since then, I've had the privilege of studying with many teachers including Doug Keller, Todd Norian, Anne Green, Desiree Rumbaugh and Rodney Yee. Honestly, some of my favorite teachers are the amazing teachers at Namaste. I am so grateful to be a yoga student, and a yoga teacher.\n\nWhen asked what type of yoga class I like to teach, I can honestly say it's whichever one I'm teaching. I know that students come to yoga for many different reasons, and I try to offer space to practice in a way that's meaningful for the individual, even in a crowded class. I regularly remind students to notice and observe what's within them.\n\nWhenever I teach, my goal is to guide students through their best practice. Students know I'm serious about teaching, but I'm not serious — I love silly and fun! Seriously, look for the joy!",
    arketaId: "E090jFMKbhRSSXmiN8FFze5TCJG2",
  },
  {
    name: "Vikki Velemesis",
    photo: "/instructors/cropped-Vikki.jpg",
    certs: ["200-hr"],
    bio: "My own personal yoga truths:\n\n#1 — The very first yoga class I ever had, I absolutely hated it. There was no way I was going to waste my time doing that ever again. I don't remember my second yoga class, but obviously that second class had a much better teacher :)\n\n#2 — Fast-forward about 15 years, I can't imagine life without yoga! Crazy life circumstances guided me to sign up for yoga teacher training at Namaste, but there was no way I was ever going to teach. Yeah, almost 3 years later, here we are.\n\n#3 — Sometimes, I have to remind myself of #1 and #2. Life can be trying and tough, but breathe, enjoy savasana, and be willing to try new things — sometimes twice. You never know what great people, experiences and new horizons you'll discover.\n\nThanks to the great teachers in my life so far and those I've yet to meet.",
    arketaId: "MGl1Cea8KESJq0bSS9iVxIXgVCu1",
  },
  {
    name: "Tori Whitehair",
    photo: "/instructors/cropped-IMG_6009-scaled-1.jpg",
    certs: ["200-hr"],
    bio: "In 2007 I walked into a gym yoga class simply because I was unable to do my usual workout due to injury. That single class turned into a regular habit, and then into a yearslong journey through many cities, teachers, life events and styles, including Hatha, Vinyasa, Hot Power, and Forrest Yoga.\n\nWhile I still appreciate the physical benefits that brought me to yoga, I also love the grounding, clarity, and calm and seek to guide others to experience a deep, nourishing practice as well. As an athlete and PM&R physician, I particularly enjoy helping others to maintain healthy bodies, learn to modify their practices to meet their individual needs, and safely return to practice following injury.\n\nI completed my 200-hour certification in 2025 under the amazing guidance of Jolynn McFerren, Cyndy Edwards, and Melissa Crouse at Namaste.",
    arketaId: "qiSjBAGYmdP5zQ1iq2mWDrAqNL92",
  },
  {
    name: "Karen Willkomm",
    photo: "/instructors/cropped-Karen-1.jpg",
    certs: ["200-hr"],
    bio: "Karen Willkomm practiced Hatha Yoga basics for about two years because she strived to master asana alignment and form. She found that she was well prepared when her schedule forced her to try more challenging classes. Ten years into her practice, Karen completed the YTT 200 program at Namaste Yoga Studio. She has enjoyed gratifying practices guided by Deana Hale, Jolynn McFerren, Ruth Zito and Desiree Rumbaugh. Karen emphasizes alignment, breath, strength and centering.\n\nKaren started coaching cross country and track at the high school level for several years and then continued coaching for another twenty years at St. Barnabas while working full-time in health care administration. Throughout 25 years of successful coaching, she strived to help athletes achieve their highest potential and prevent injuries by including appropriate stretching, warm-ups and cool downs in daily workouts. Karen has hung up her whistle and rolled out a yoga mat to guide athletes through a practice that will accelerate recovery and enhance preparation for the next competition.\n\nKaren's mantra? \"I teach because I want students to reach higher, both physically and mentally.\"",
    arketaId: "WZLmFVCuHeV3S80KVaJbhU50pXM2",
  },
];
