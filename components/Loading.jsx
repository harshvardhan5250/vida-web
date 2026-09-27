"use client";

export default function Loading() {
  return (
    <div className="loadingPage">
      <div className="loadingContent">

        <div className="loadingLogo">
          VIDA<span>WEB</span>
        </div>

        <div className="loadingLine">
          <div className="loadingProgress"></div>
        </div>

        <p>
          Building your experience...
        </p>

      </div>
    </div>
  );
}