const fs = require('fs');

let jsonLessonData = JSON.parse(fs.readFileSync("./../data/all_post_data.json"));

const updateSectionNames = () => {
    // Define the section names based on the provided JSON structure
    const sectionNames =[
        {
          "courseName": "Introduction to Stock Markets",
          "sections": [
            {"section": 1, "sectionName": "Introduction to Investing", "sectionDescription": "Understanding the basics of investing.", "startLesson": 1, "endLesson": 5},
            {"section": 2, "sectionName": "Stock Markets and Indices", "sectionDescription": "Exploring stock markets and indices.", "startLesson": 6, "endLesson": 8},
            {"section": 3, "sectionName": "Trading and Market Dynamics", "sectionDescription": "Analyzing trading strategies and market dynamics.", "startLesson": 9, "endLesson": 15}
          ]
        },
        {
          "courseName": "Technical Analysis",
          "sections": [
            {"section": 1, "sectionName": "Basics and Chart Types", "sectionDescription": "Covering basics and various chart types.", "startLesson": 1, "endLesson": 7},
            {"section": 2, "sectionName": "Candlestick Patterns", "sectionDescription": "Examining candlestick patterns in-depth.", "startLesson": 8, "endLesson": 15},
            {"section": 3, "sectionName": "Advanced Concepts and Tools", "sectionDescription": "Exploring advanced technical analysis concepts and tools.", "startLesson": 16, "endLesson": 22}
          ]
        },
        {
          "courseName": "Fundamental Analysis",
          "sections": [
            {"section": 1, "sectionName": "Introduction and Investor Mindset", "sectionDescription": "Developing the mindset of an investor.", "startLesson": 1, "endLesson": 3},
            {"section": 2, "sectionName": "Financial Statements Analysis", "sectionDescription": "Learning to interpret financial statements.", "startLesson": 4, "endLesson": 8},
            {"section": 3, "sectionName": "Ratio Analysis, Due Diligence, and Equity Research", "sectionDescription": "Analyzing ratios, due diligence, and equity research.", "startLesson": 9, "endLesson": 16}
          ]
        },
        {
          "courseName": "Futures Trading",
          "sections": [
            {"section": 1, "sectionName": "Basics of Forwards and Introduction to Futures", "sectionDescription": "Understanding forwards and introduction to futures markets.", "startLesson": 1, "endLesson": 4},
            {"section": 2, "sectionName": "Trading Mechanics and Calculations", "sectionDescription": "Exploring trading mechanics and calculations.", "startLesson": 5, "endLesson": 8},
            {"section": 3, "sectionName": "Shorting, Nifty Futures, and Advanced Concepts", "sectionDescription": "Delving into shorting, Nifty futures, and advanced concepts.", "startLesson": 9, "endLesson": 13}
          ]
        },
        {
          "courseName": "Options Theory for Professional Trading",
          "sections": [
            {"section": 1, "sectionName": "Basics of Options Trading", "sectionDescription": "Grasping the basics of options trading.", "startLesson": 1, "endLesson": 7},
            {"section": 2, "sectionName": "Option Contract Characteristics and Greeks", "sectionDescription": "Understanding option contract characteristics and Greeks.", "startLesson": 8, "endLesson": 14},
            {"section": 3, "sectionName": "Volatility, Advanced Greeks, and Case Studies", "sectionDescription": "Exploring volatility, advanced Greeks, and case studies.", "startLesson": 15, "endLesson": 25}
          ]
        },
        {
          "courseName": "Option Strategies",
          "sections": [
            {"section": 1, "sectionName": "Basics and Bullish Strategies", "sectionDescription": "Mastering basic and bullish option strategies.", "startLesson": 1, "endLesson": 3},
            {"section": 2, "sectionName": "Bearish and Ratio Strategies", "sectionDescription": "Implementing bearish and ratio option strategies.", "startLesson": 4, "endLesson": 7},
            {"section": 3, "sectionName": "Advanced Strategies", "sectionDescription": "Advancing to more complex and advanced option strategies.", "startLesson": 8, "endLesson": 14}
          ]
        }
      ]
      

          
      
      let count = 0
    // Update section names in the jsonLessonData array
    jsonLessonData.forEach(lesson => {
        const courseName = lesson.course;
        const sectionNumber = lesson.section;
        const lessonOrder = lesson.order

        const matchingCourse = sectionNames.find(course => course.courseName === courseName);
        if (matchingCourse) {
            matchingCourse.sections.map((section) => {
                if (lessonOrder >= section.startLesson && lessonOrder <= section.endLesson){
                    lesson.section = section.section
                    count ++  
                    lesson.sectionName = section.sectionName
                    lesson.sectionDescription = section.sectionDescription
                }
            })
        }
    });
    fs.writeFileSync("./../data/all_post_data.json", JSON.stringify(jsonLessonData, null, 2));
    console.log(count);
};

updateSectionNames()

// insertLessons();
// const fs = require('fs');

// // Read the existing JSON file
// let jsonLessonData = JSON.parse(fs.readFileSync("./../data/all_post_data.json"));

// // Define the new structure with startLesson and endLesson
// const updatedSectionStructure = [
//     {
//       "courseName": "Introduction to Stock Markets",
//       "sectionNames": [
//         {"1": "Introduction", "startLesson": 1, "endLesson": 5},
//         {"2": "Intermediate", "startLesson": 6, "endLesson": 8},
//         {"3": "Advanced", "startLesson": 9, "endLesson": 15}
//       ]
//     },
//     {
//       "courseName": "Technical Analysis",
//       "sectionNames": [
//         {"1": "Introduction", "startLesson": 1, "endLesson": 7},
//         {"2": "Intermediate", "startLesson": 8, "endLesson": 15},
//         {"3": "Advanced", "startLesson": 16, "endLesson": 22}
//       ]
//     },
//     {
//       "courseName": "Fundamental Analysis",
//       "sectionNames": [
//         {"1": "Introduction", "startLesson": 1, "endLesson": 3},
//         {"2": "Intermediate", "startLesson": 4, "endLesson": 8},
//         {"3": "Advanced", "startLesson": 9, "endLesson": 16}
//       ]
//     },
//     {
//       "courseName": "Futures Trading",
//       "sectionNames": [
//         {"1": "Introduction", "startLesson": 1, "endLesson": 4},
//         {"2": "Intermediate", "startLesson": 5, "endLesson": 8},
//         {"3": "Advanced", "startLesson": 9, "endLesson": 13}
//       ]
//     },
//     {
//       "courseName": "Options Theory for Professional Trading",
//       "sectionNames": [
//         {"1": "Introduction", "startLesson": 1, "endLesson": 7},
//         {"2": "Intermediate", "startLesson": 8, "endLesson": 14},
//         {"3": "Advanced", "startLesson": 15, "endLesson": 25}
//       ]
//     },
//     {
//       "courseName": "Option Strategies",
//       "sectionNames": [
//         {"1": "Introduction", "startLesson": 1, "endLesson": 3},
//         {"2": "Intermediate", "startLesson": 4, "endLesson": 7},
//         {"3": "Advanced", "startLesson": 8, "endLesson": 14}
//       ]
//     }
//   ]
  
  
//   // Update the section field based on the order number
//   var count = 0
//   jsonLessonData = jsonLessonData.map(lesson => {
//     const matchingCourse = updatedSectionStructure.find(course => course.courseName === lesson.course);
//     if (matchingCourse) {
//         const matchingSection = matchingCourse.sectionNames.find(section => console.log(section[lesson.section]));
//         if (matchingSection) {
//             if (matchingSection.startLesson === parseInt(lesson.section)){
//                 // console.log(matchingSection);
//             }
//             count ++
//             lesson.section = parseInt(Object.keys(matchingSection)[0]);
//       }
//     }
  
//     return lesson;
//   });
//   console.log(count);
//   // Write the updated JSON data back to the file
// //   fs.writeFileSync("./../data/all_post_data_updated.json", JSON.stringify(jsonLessonData, null, 2));
  
//   console.log('JSON file updated successfully!');
  