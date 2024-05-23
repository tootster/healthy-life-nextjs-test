import React from 'react';
export async function getServerSideProps(context) {
  try {
    const { goal } = context.params;
    const response = await fetch(`https://unstats.un.org/sdgapi/v1/sdg/Goal/${goal}/Target/List?includechildren=false`);
    if (!response.ok) {
      throw new Error(`Failed to fetch goal details for ${goal}, status: ${response.status}`);
    }
    const data = await response.json();
    return {
      props: {
        goalDetails: data
      },
    }
  } catch (error) {
    console.error(error);
    return {
      props: {
        error: "Failed to load data.",
        goalDetails: [ { title: 'API Error'}]
      }
    };
  }
}
export default function GoalDetail({ goalDetails }) {
    return (
      <div className="container mx-auto p-4">
        {goalDetails.map((goalDetails) => (
          <div>
            <h1 className="text-4xl font-bold mb-4">{goalDetails.title}</h1>
            <p className="text-lg">{goalDetails.description}</p>
          </div>
        ))}
      </div>
      
    );
  }