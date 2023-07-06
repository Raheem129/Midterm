(($) => {
  // Attach click event handler to copy buttons when the document is ready
  $(document).on('click', '.c_b', copyMessage);

  /**
   * Copies the string from the copy button to the clipboard and displays a confirmation message.
   * @return {none}
   */
  const copyMessage = function() {
    $(this).find('input').select();
    document.execCommand('copy');

    let $text = $(this).find('span').text();

    $(this).find('span').text('Link Copied!');

    setTimeout(() => {
      $(this).find('span').text($text);
    }, 2000);
  };

})(jQuery);