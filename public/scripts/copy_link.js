(($) => {
  // Attach click event handler to copy buttons when the document is ready
  $(document).on('click', '.c_b', copyMessage);

  /**
   * Copies the string from the copy button to the clipboard and displays a confirmation message.
   * @return {none}
   */
  const copyMessage = function() {
    // Select the input element within the clicked button
    $(this).find('input').select();
    document.execCommand('copy');

    // Store the original text of the span element
    let originalText = $(this).find('span').text();

    // Update the span text to indicate that the link has been copied
    $(this).find('span').text('Link Copied!');

    // Reset the span text to the original value after a delay of 2 seconds
    setTimeout(() => {
      $(this).find('span').text(originalText);
    }, 2000);
  };

})(jQuery);